import db from "./db.js";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();

const app = express()
const PORT = process.env.PORT || 3001;
app.use(
    cors({
        origin: [
        "http://localhost:5174",        
        // "https://your-site.netlify.app"  
        ],
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from backend!');
});

app.get("/info", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM Categories");
        console.log("✅ Результат:", rows);
        res.status(200).json(rows);
    } catch (err) {
        console.error("❌ Ошибка при запросе:", err);
        res.status(500).json({ message: err.message });
    }
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));