// src/server.js
import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

// Product
import { initProductModel } from "./models/ProductModels.js";
import { initProductController } from "./controllers/ProductControllers.js";
import crudProductRoutes from "./routes/ProductRoutes.js";

// Users
import { initUserModel } from "./models/UserModels.js";
import { initUserController } from "./controllers/UserControllers.js";
import crudUserRoutes from "./routes/UserRoutes.js";

// Auth
import { initAuthModel } from "./models/authModels.js";
import { initAuthController } from "./controllers/authControllers.js";
import crRoutes from "./routes/authRoutes.js";

// Friend Request
import { friendReqRoutes } from "./routes/FriendReqRoutes.js";
import { initFriendReqModel } from "./models/FriendReqModels.js";
import { initFriendReqController } from "./controllers/FriendReqControllers.js";

// Message
import { MessageRoutes } from "./routes/MessageRoutes.js";
import { initMessageModel } from "./models/MessageModels.js";
import { initMessageController } from "./controllers/MessageController.js"; // SỬA: Controller → không có "s"

import swaggerUI from "swagger-ui-express";
import fs from "fs";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
// Swagger setup
const swaggerDocument = JSON.parse(fs.readFileSync("./BackEnd/src/swagger.json"));
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// Kết nối DB
const db = await connectDB();

// === KHỞI TẠO MODEL & CONTROLLER ===

// Product
const productModel = initProductModel(db);
const { getProducts, createProduct, putProduct, deleteProduct } = initProductController(productModel);

// Users
const userModel = initUserModel(db);
const { getUsers, createUsers, putUsers, deleteUsers } = initUserController(userModel);

// Auth
const authModel = initAuthModel(db);
const { login, register, getAccount } = initAuthController(authModel); // SỬA: thêm khoảng trắng

// Friend Request
const friendReqModel = initFriendReqModel(db);
const { postFriendReq, getFriendReqs, postToFriendReq,getAllFriends } = initFriendReqController(friendReqModel);

// Message
const messageModel = initMessageModel(db);
const { sendDirectMess } = initMessageController(messageModel);

// === ROUTES ===
const productRoutes = crudProductRoutes(getProducts, createProduct, putProduct, deleteProduct);
app.use('/api/products', productRoutes);

const userRoutes = crudUserRoutes(getUsers, createUsers, putUsers, deleteUsers);
app.use('/api/users', userRoutes);

const authRoutes = crRoutes(login, register, getAccount);
app.use('/api/auth', authRoutes);

const friendRoutes = friendReqRoutes(postFriendReq, getFriendReqs, postToFriendReq,getAllFriends);
app.use('/api/friends', friendRoutes);

const messageRoutes = MessageRoutes(sendDirectMess);
app.use('/api/messages', messageRoutes);

// Route gốc
app.get("/", (req, res) => {
  res.send("Welcome to Nodejs API");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});