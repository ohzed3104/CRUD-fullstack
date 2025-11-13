// src/server.js
import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import { initProductModel } from "./models/ProductModels.js";
import { initProductController } from "./controllers/ProductControllers.js";
import crudProductRoutes from "./routes/ProductRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Kết nối DB
const db = await connectDB();

// Khởi tạo model & controller
const productModel = initProductModel(db);
const { getProducts,createProduct,putProduct,deleteProduct } = initProductController(productModel);

// Tạo route
const productRoutes = crudProductRoutes(getProducts,createProduct,putProduct,deleteProduct);
app.use('/api/products', productRoutes);

// Route gốc
app.get("/", (req, res) => {
  res.send("Welcome to Nodejs API");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});