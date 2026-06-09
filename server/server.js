import dns from "node:dns";
import express from "express";
import cors from "cors";
import "dotenv/config"
import multer from "multer";
import connectDB from "./config/db.js";

// Use public DNS for SRV resolution when local DNS refuses MongoDB SRV queries
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express()
const PORT = process.env.PORT || 4000;

//Middleware
app.use(cors())
app.use(express.json())
app.use(multer().none())

//Routes
app.get('/', (req, res)=>{
    res.send("Server is Running")
})

await connectDB()
app.listen(PORT, ()=>{
    console.log(`Server Runing on port ${PORT}`)
})