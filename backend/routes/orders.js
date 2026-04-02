import express from "express";
import db from "../db.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// router.get("/my", authenticateToken, async (req, res) => {
//     try {
//         const userId = req.user.id;

//         const [rows] = await db.query(`
//         SELECT 
//             o.id AS order_id,
//             o.order_date,
//             o.total_amount,
//             o.status,
//             u.name AS first_name,
//             u.surname AS last_name,
//             oi.product_id,
//             oi.qty,
//             oi.price_at_purchase,
//             p.name,
//             p.image
//         FROM orders o
//         JOIN users u ON o.user_id = u.id
//         JOIN order_items oi ON o.id = oi.order_id
//         JOIN products p ON oi.product_id = p.id
//         WHERE o.user_id = ?
//         ORDER BY o.id DESC
//     `, [userId]);

//         let user = null;
//         const result = [];

//         rows.forEach(row => {
//             if (!user) {
//                 user = {
//                     firstName: row.first_name || "Ім'я",
//                     lastName: row.last_name || "Прізвище"
//                 };
//             }

//             let order = result.find(o => o.id === row.order_id);

//             if (!order) {
//                 order = {
//                     id: row.order_id,
//                     date: row.order_date,
//                     total: row.total_amount,
//                     status: row.status,
//                     items: []
//                 };
//                 result.push(order);
//             }

//             order.items.push({
//                 name: row.name,
//                 price: row.price_at_purchase,
//                 quantity: row.qty,
//                 image: row.image
//             });
//         });

//         res.json({
//             user,
//             orders: result
//         });

//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Помилка сервера" });
//     }
// });


router.get("/my", authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;

        // 🔹 1. Отримуємо користувача окремо
        const [[userRow]] = await db.query(
            "SELECT name, surname FROM users WHERE id = ?",
            [userId]
        );

        const user = {
            firstName: userRow?.name || "Ім'я",
            lastName: userRow?.surname || "Прізвище"
        };

        // 🔹 2. Отримуємо замовлення
        const [rows] = await db.query(`
            SELECT 
                o.id AS order_id,
                o.order_date,
                o.total_amount,
                o.status,
                oi.product_id,
                oi.qty,
                oi.price_at_purchase,
                p.name,
                p.image
            FROM orders o
            JOIN order_items oi ON o.id = oi.order_id
            JOIN products p ON oi.product_id = p.id
            WHERE o.user_id = ?
            ORDER BY o.id DESC
        `, [userId]);

        const result = [];

        rows.forEach(row => {
            let order = result.find(o => o.id === row.order_id);

            if (!order) {
                order = {
                    id: row.order_id,
                    date: row.order_date,
                    total: row.total_amount,
                    status: row.status,
                    items: []
                };
                result.push(order);
            }

            order.items.push({
                name: row.name,
                price: row.price_at_purchase,
                quantity: row.qty,
                image: row.image
            });
        });

        res.json({
            user,
            orders: result
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Помилка сервера" });
    }
});


router.post("/orders", authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const { items, totalAmount, comment, paymentMethod, shippingAddress } = req.body;

        const [orderResult] = await db.query(
            `INSERT INTO orders (user_id, total_amount, status, comment, payment_method, shipping_address, order_date) 
            VALUES (?, ?, 'pending', ?, ?, ?, NOW())`,
            [userId, totalAmount, comment || "", paymentMethod || "cash", shippingAddress || ""]
        );

        const orderId = orderResult.insertId;

        for (const item of items) {
            await db.query(
                `INSERT INTO order_items (order_id, product_id, qty, price_at_purchase) 
                VALUES (?, ?, ?, ?)`,
                [orderId, item.id, item.quantity, item.price]
            );
        }

        res.json({ success: true, orderId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Помилка сервера" });
    }
});

router.get("/profile", authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const [[user]] = await db.query(
            "SELECT name, surname, email, number, gender FROM users WHERE id = ?",
            [userId]
        );

        if (!user) return res.status(404).json({ message: "Користувача не знайдено" });

        res.json({
            firstName: user.name || "",
            lastName: user.surname || "",
            email: user.email || "",
            phone: user.number || "",
            gender: user.gender || "m"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Помилка сервера" });
    }
});

router.put("/profile", authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const { firstName, lastName, phone, email, gender } = req.body;

        await db.query(
            `UPDATE users 
                SET name = ?, surname = ?, number = ?, email = ?, gender = ?
                WHERE id = ?`,
            [
                firstName || "",
                lastName || "",
                phone || null,
                email || "",
                gender || "m",
                userId
            ]
        );

        res.json({ success: true });
    } catch (err) {
        console.error("Profile update error:", err);
        res.status(500).json({ message: "Помилка сервера" });
    }
});

export default router;