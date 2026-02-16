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

router.get("/auth/check", authenticateToken, (req, res) => {
    res.json({ valid: true, user: req.user });
});

export default router;
