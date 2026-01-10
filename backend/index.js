import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import productRoutes from './routes/product.js';
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js'

dotenv.config();

const app = express()
const PORT = process.env.PORT || 3001;
app.use(
    cors({
        origin: [
        "http://localhost:5173"
        ],
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(express.json());

app.use('/', productRoutes);
app.use('/', authRoutes);
app.use('/', adminRoutes);

app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ 
        message: "Internal server error",
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));