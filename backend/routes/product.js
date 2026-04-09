import express from 'express';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import db from "../db.js";

const router = express.Router();
const saltRounds = 10;

// router.get("/products", async (req, res) => {
//     try {
//         const [rows] = await db.query(`
//             SELECT 
//             p.id, p.name, p.description, p.qty, p.price, p.image,
//             p.trademark, ROUND(p.discount, 0) AS discount
//             FROM products p
//         `);
//         res.status(200).json(rows);
//     } catch (err) {
//         console.error("Error:", err);
//         res.status(500).json({ message: err.message });
//     }
// });


router.get("/products", async (req, res) => {
    try {
        const [rows] = await db.query(`
        SELECT 
            p.id, p.name, p.description, p.qty, p.price, p.image,
            p.trademark, ROUND(p.discount, 0) AS discount,

            -- якщо є parent → це category
            -- якщо нема → беремо child
            COALESCE(parent.name, child.name) AS category,

            -- subcategory тільки якщо реально є parent
            CASE 
                WHEN parent.name IS NOT NULL THEN child.name
                ELSE NULL
            END AS subcategory

        FROM products p
        LEFT JOIN categories child ON p.category_id = child.id
        LEFT JOIN categories parent ON child.parent_id = parent.id
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
                image,
                ROUND(discount, 0) AS discount
            FROM products
            WHERE discount > 0
            ORDER BY discount DESC
            LIMIT 40
        `);

        res.status(200).json(rows);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ message: err.message });
    }
});

router.get("/products/search", async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) return res.json([]);

        const [rows] = await db.query(`
            SELECT id, name, price, image,
            CASE
                WHEN name LIKE ? THEN 1
                WHEN name LIKE ? THEN 2
                ELSE 3
            END AS relevance
            FROM products
            WHERE name LIKE ?
            ORDER BY relevance ASC, name ASC
            LIMIT 6
        `, [
            `${q}%`,
            `% ${q}%`,
            `%${q}%`
        ]);

        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

router.get("/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query(
            `SELECT p.id, p.name, p.description, p.qty, p.price, p.image,
                p.country, p.trademark, p.seller,
                ROUND(p.discount, 0) AS discount,
                child.name AS subcategory,
                parent.name AS category
                FROM products p
                LEFT JOIN categories child ON p.category_id = child.id
                LEFT JOIN categories parent ON child.parent_id = parent.id
                WHERE p.id = ?`,
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: "Продукт не знайдено" });
        }

        res.status(200).json(rows[0]);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ message: err.message });
    }
});


export default router;