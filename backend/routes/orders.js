import express from "express";
import db from "../db.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/my", authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;

        const [rows] = await db.query(`
        SELECT 
            o.id AS order_id,
            o.order_date,
            o.total_amount,
            u.name AS first_name,
            u.surname AS last_name,
            oi.product_id,
            oi.qty,
            oi.price_at_purchase,
            p.name,
            p.image
        FROM orders o
        JOIN users u ON o.user_id = u.id
        JOIN order_items oi ON o.id = oi.order_id
        JOIN products p ON oi.product_id = p.id
        WHERE o.user_id = ?
        ORDER BY o.id DESC
    `, [userId]);

        let user = null;
        const result = [];

        rows.forEach(row => {
            if (!user) {
                user = {
                    firstName: row.first_name,
                    lastName: row.last_name
                };
            }

            let order = result.find(o => o.id === row.order_id);

            if (!order) {
                order = {
                    id: row.order_id,
                    date: row.order_date,
                    total: row.total_amount,
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

export default router;