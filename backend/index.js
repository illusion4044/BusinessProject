// import db from "./userdb.js";
// import dotenv from "dotenv";
import express from "express";
import cors from "cors";

// dotenv.config();

const PORT = process.env.PORT || 3001
const app = express()
app.use(
    cors({
        origin: "http://localhost:5174",
        methods: ["GET", "POST", "PUT", "DELETE"], 
        allowedHeaders: ["Content-Type", "Authorization"], 
    })
);

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.use(express.json());

app.listen(PORT, ()=> {console.log(`server is running on ${PORT}`)})