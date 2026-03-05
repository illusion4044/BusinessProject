import express from 'express';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import db from "../db.js";
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();
const saltRounds = 10;

router.post("/login", async (req, res) => {
    const {email, password} = req.body;
    
    try {
        const [rows] = await db.query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );
        if (rows.length === 0) {
            return res.status(400).json({ message: "Користувача не знайдено" });
        }

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Невірний пароль" });
        }

        const tokenExpiresIn = user.role === "admin" ? "2h" : "5d";

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            process.env.JWT_SECRET || "secret123",
            { expiresIn: tokenExpiresIn }
        );

        return res.status(200).json({
            message: "Успішний вхід!",
            token,
            role: user.role,
            userId: user.id
        });
    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({ message: "Помилка сервера" });
    }
})

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Всі поля обов'язкові" });
        }

        if (name.trim().length < 2) {
            return res.status(400).json({ message: "Ім'я має бути мінімум 2 символи" });
        }

        const emailRegex = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Невірний формат email" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Пароль має бути мінімум 6 символів" });
        }

        const [existingUsers] = await db.query(
            "SELECT id FROM users WHERE email = ?",
            [email]
        );

        if (existingUsers.length > 0) {
            return res.status(400).json({ message: "Користувач з таким email вже існує" });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const [result] = await db.query(
            "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
            [name.trim(), email.toLowerCase().trim(), hashedPassword, "user"]
        );

        const userId = result.insertId;

        const token = jwt.sign(
            {
                id: userId,
                role: "user"
            },
            process.env.JWT_SECRET || "secret123",
            { expiresIn: "5d" }
        );

        return res.status(201).json({
            message: "Реєстрація успішна!",
            token,
            role: "user",
            userId: userId
        });

    } catch (err) {
        console.error("Register error:", err);
        return res.status(500).json({ message: "Помилка сервера" });
    }
});

router.get("/auth/check", authenticateToken, (req, res) => {
    res.json({ valid: true, user: req.user });
});

export default router;
