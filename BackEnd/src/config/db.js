// src/config/db.js
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

let db = null;

const connectDB = async () => {
  if (db) return db;

  try {
    db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    console.log("Connected to MySQL:", process.env.DB_NAME);
    return db;
  } catch (err) {
    console.error("DB Connection Failed:", err.message);
    process.exit(1);
  }
};

export default connectDB;