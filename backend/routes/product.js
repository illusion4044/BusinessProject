import express from 'express';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import db from "../db.js";

const router = express.Router();
const saltRounds = 10;


router.get("/products", async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT 
            p.id, p.name, p.description, p.qty, p.price
            FROM products p
        `);

        res.status(200).json(rows);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ message: err.message });
    }
});

router.get("/discountgallery", async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT 
                id,
                name,
                description, 
                qty, 
                price, 
                ROUND(discount, 0) AS discount
            FROM products
            WHERE discount > 0
            ORDER BY discount DESC
            LIMIT 10;
        `);

        res.status(200).json(rows);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ message: err.message });
    }
});

export default router;