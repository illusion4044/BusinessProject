import mysql from "mysql2/promise";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const db = mysql.createPool({
    host: process.env.DBHOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DBNAME,
    port: process.env.DBPORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: {
        ca: fs.readFileSync("./ca.pem")
    }
});

(async () => {
    try{
        const connection = await db.getConnection();
        console.log("✅ Connected to the DB");
        connection.release();
    } catch (err) {
        console.error("Database connection error", err);
    }
})();


export default db;




