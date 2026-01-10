import express from 'express';
import jwt from "jsonwebtoken";
import db from "../db.js";

const router = express.Router();

router.post('/admin/addproduct', async(req, res) => {
    try{
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "No token" });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== "admin") {
            return res.status(403).json({ message: "Access denied" });
        }

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


export default router;
