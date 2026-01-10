import express from 'express';
import jwt from "jsonwebtoken";
import db from "../db.js";
import { authenticateToken } from '../middleware/authMiddleware.js';
import { requireRole } from '../middleware/requireRole.js';

const router = express.Router();

router.post('/admin/addproduct', authenticateToken, requireRole("admin"), async(req, res) => {
    try{
        const {
            name,
            description,
            qty,
            price,  
            category_id,
            country,
            trademark,
            seller,
            unit
        } = req.body;

        if (!name || !price || !qty) {
            return res.status(400).json({ message: "Required fields missing" });
        }

        const [result] = await db.query(
            `INSERT INTO products
            (name, description, qty, price, category_id, country, trademark, seller, unit)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [ 
            name,
            description,
            qty,
            price,  
            category_id,
            country,
            trademark,
            seller, 
            unit || 'шт']
        );

        res.status(201).json({
            message: "Product added successfully",
            productId: result.insertId
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
})

router.get("/productlist", async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT 
            p.id, p.name, p.image_data, p.qty, p.price
            FROM products p
        `);

        res.status(200).json(rows);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ message: err.message });
    }
});

router.delete("/admin/deleteproduct/:id", authenticateToken, requireRole("admin"), async (req, res) => {
    try {
        const { id } = req.params;

        await db.query(
            "DELETE FROM products WHERE id = ?",
            [id]
        );

        res.json({ message: "Product deleted" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
