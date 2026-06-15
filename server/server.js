import dns from "node:dns";
import express from "express";
import cors from "cors";
import "dotenv/config"
import multer from "multer";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import employeeRouter from "./routes/employeeRoutes.js";
import profileRouter from "./routes/profileRoutes.js";
import attendanceRouter from "./routes/attendanceRoutes.js";
import leaveRouter from "./routes/leaveRoutes.js";

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

app.use('/api/auth', authRouter)
app.use('/api/employees', employeeRouter)
app.use('/api/profile', profileRouter)
app.use('/api/attendance', attendanceRouter)
app.use('/api/leave', leaveRouter)


await connectDB()
app.listen(PORT, ()=>{
    console.log(`Server Runing on port ${PORT}`)
})