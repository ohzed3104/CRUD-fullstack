// src/server.js
import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
//product
import { initProductModel } from "./models/ProductModels.js";
import { initProductController } from "./controllers/ProductControllers.js";
import crudProductRoutes from "./routes/ProductRoutes.js";
//users
import { initUserModel } from "./models/UserModels.js";
import { initUserController } from "./controllers/UserControllers.js";
import crudUserRoutes from "./routes/UserRoutes.js";
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Kết nối DB
const db = await connectDB();

// Khởi tạo model & controller
//product
const productModel = initProductModel(db);
const { getProducts,createProduct,putProduct,deleteProduct } = initProductController(productModel);
//users
const userModel = initUserModel(db);
const {getUsers,createUsers,putUsers,deleteUsers} = initUserController(userModel);



// Tạo route
//product
const productRoutes = crudProductRoutes(getProducts,createProduct,putProduct,deleteProduct);
app.use('/api/products', productRoutes);

//users
const userRoutes = crudUserRoutes(getUsers,createUsers,putUsers,deleteUsers);
app.use('/api/users',userRoutes);


// Route gốc
app.get("/", (req, res) => {
  res.send("Welcome to Nodejs API");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});