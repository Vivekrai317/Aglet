import express from "express";
import dotenv from "dotenv"

import authRoutes from "./routes/auth.route.js"
import productRoutes from "./routes/product.route.js"
import { connectDB } from "./lib/db.js";

import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(express.json()) // allows to parse body of request
app.use(cookieParser())
app.use("/api/auth",authRoutes)
app.use("/api/products",productRoutes)

app.listen(PORT,()=>{
    console.log("Server running on port",PORT);
    connectDB()
})