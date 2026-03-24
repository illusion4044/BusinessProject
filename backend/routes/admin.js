import express from 'express';
import jwt from "jsonwebtoken";
import db from "../db.js";
import { authenticateToken } from '../middleware/authMiddleware.js';
import { requireRole } from '../middleware/requireRole.js';
import multer from "multer";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/products/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });
const router = express.Router();

router.post('/admin/addproduct', authenticateToken, requireRole("admin"), upload.single("image"), async(req, res) => {
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

        const imagePath = req.file ? "/uploads/products/" + req.file.filename : null;

        const [result] = await db.query(
            `INSERT INTO products
            (name, description, qty, price, category_id, country, trademark, seller, unit, image)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [ 
            name,
            description,
            qty,
            price,  
            category_id,
            country,
            trademark,
            seller, 
            unit || 'шт',
            imagePath]
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

router.put("/admin/editproduct/:id", authenticateToken, requireRole("admin"), upload.single("image"), async (req, res) => {
    try {

        const { id } = req.params;
        const { name, description, qty, price, category_id, country, trademark, seller, unit, removeImage } = req.body;

        let fields = [];
        let values = [];

        if (name !== undefined) {
            fields.push("name=?");
            values.push(name);
        }

        if (description !== undefined) {
            fields.push("description=?");
            values.push(description);
        }

        if (qty !== undefined) {
            fields.push("qty=?");
            values.push(qty);
        }

        if (price !== undefined) {
            fields.push("price=?");
            values.push(price);
        }

        if (category_id !== undefined) {
            fields.push("category_id=?");
            values.push(category_id || null);
        }

        if (country !== undefined) {
            fields.push("country=?");
            values.push(country);
        }

        if (trademark !== undefined) {
            fields.push("trademark=?");
            values.push(trademark);
        }

        if (seller !== undefined) {
            fields.push("seller=?");
            values.push(seller);
        }

        if (unit !== undefined) {
            fields.push("unit=?");
            values.push(unit);
        }

        if (removeImage === "true") {

            const [rows] = await db.query(
                "SELECT image FROM products WHERE id = ?",
                [id]
            );

            if (rows[0]?.image) {

                const oldPath = path.join(process.cwd(), rows[0].image.replace(/^\/+/, ""));

                fs.unlink(oldPath, err => {
                    if (err) console.log("Image delete error:", err.message);
                });

                fields.push("image=NULL");
            }
        }

        if (req.file) {

            const imagePath = "/uploads/products/" + req.file.filename;

            const [rows] = await db.query(
                "SELECT image FROM products WHERE id = ?",
                [id]
            );

            if (rows[0]?.image) {

                const oldPath = path.join(process.cwd(), rows[0].image.replace(/^\/+/, ""));

                fs.unlink(oldPath, err => {
                    if (err) console.log("Old image delete error:", err.message);
                });
            }

            fields.push("image=?");
            values.push(imagePath);
        }

        if (fields.length === 0) {
            return res.status(400).json({ message: "No fields to update" });
        }

        const query = `UPDATE products SET ${fields.join(", ")} WHERE id=?`;
        values.push(id);

        await db.query(query, values);

        res.json({ message: "Product updated" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

router.get("/productlist", async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT 
            p.id, p.name, p.image, p.qty, p.price, p.category_id
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

        const [rows] = await db.query(
            "SELECT image FROM products WHERE id = ?",
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        const imagePath = rows[0].image;

        if (imagePath) {
            const fullPath = path.join(process.cwd(), imagePath);

            fs.unlink(fullPath, (err) => {
                if (err) {
                    console.log("Error deleting image:", err.message);
                }
            });
        }

        await db.query("DELETE FROM order_items WHERE product_id = ?", [id]);

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

router.get("/product/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query("SELECT * FROM products WHERE id = ?", [id]);
        if (rows.length === 0) return res.status(404).json({ message: "Not found" });
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

//Categories

router.get("/categories", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM categories");
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Server error"});
    }
});

router.post("/admin/addcategory", authenticateToken, requireRole("admin"), async (req, res) => {
    try {
        const { name } = req.body;

        if(!name){
            return res.status(400).json({message:"Name required"});
        }

        const [result] = await db.query(
            "INSERT INTO categories (name, parent_id) VALUES (?, NULL)",
            [name]
        );

        res.json({
            message: "Category added",
            id: result.insertId
        });

    } catch(err){
        console.error(err);
        res.status(500).json({message:"Server error"});
    }
});

router.post("/admin/addsubcategory", authenticateToken, requireRole("admin"), async (req, res) => {
    try {

        const { name, parent_id } = req.body;

        if(!name || !parent_id){
            return res.status(400).json({message:"Data missing"});
        }

        const [result] = await db.query(
            "INSERT INTO categories (name, parent_id) VALUES (?, ?)",
            [name, parent_id]
        );

        res.json({
            message:"Subcategory added",
            id: result.insertId
        });

    } catch(err){
        console.error(err);
        res.status(500).json({message:"Server error"});
    }
});

router.delete("/admin/deletecategory/:id", authenticateToken, requireRole("admin"), async (req,res)=>{
    try{

        const { id } = req.params;

        await db.query(
            "DELETE FROM categories WHERE id = ? OR parent_id = ?",
            [id, id]
        );

        res.json({message:"Category deleted"});

    }catch(err){
        console.error(err);
        res.status(500).json({message:"Server error"});
    }
});

router.put("/admin/editcategory/:id", authenticateToken, requireRole("admin"), async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        if (!name) return res.status(400).json({ message: "Name required" });
        await db.query("UPDATE categories SET name = ? WHERE id = ?", [name, id]);
        res.json({ message: "Category updated" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// GET всі замовлення для адміна
router.get("/admin/orders", authenticateToken, async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT 
                o.id, o.status, o.total_amount, o.order_date,
                o.comment, o.payment_method, o.shipping_address,
                o.first_name, o.last_name, o.phone, o.email,
                oi.qty, oi.price_at_purchase,
                p.name AS product_name, p.image
            FROM orders o
            LEFT JOIN order_items oi ON o.id = oi.order_id
            LEFT JOIN products p ON oi.product_id = p.id
            ORDER BY o.id DESC
        `);

        const result = [];
        rows.forEach(row => {
            let order = result.find(o => o.id === row.id);
            if (!order) {
                order = {
                    id: row.id,
                    status: row.status,
                    total_amount: row.total_amount,
                    first_name: row.first_name,
                    last_name: row.last_name,
                    phone: row.phone,
                    email: row.email,
                    shipping_address: row.shipping_address,
                    payment_method: row.payment_method,
                    comment: row.comment,
                    items: []
                };
                result.push(order);
            }
            if (row.product_name) {
                order.items.push({
                    name: row.product_name,
                    image: row.image,
                    quantity: row.qty,
                    price: row.price_at_purchase
                });
            }
        });

        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Помилка сервера" });
    }
});

router.patch("/admin/orders/:id/status", authenticateToken, async (req, res) => {
    try {
        const { status } = req.body;
        await db.query("UPDATE orders SET status = ? WHERE id = ?", [status, req.params.id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ message: "Помилка сервера" });
    }
});

router.delete("/admin/orders/:id", authenticateToken, async (req, res) => {
    try {
        await db.query("DELETE FROM order_items WHERE order_id = ?", [req.params.id]);
        await db.query("DELETE FROM orders WHERE id = ?", [req.params.id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ message: "Помилка сервера" });
    }
});

export default router;
