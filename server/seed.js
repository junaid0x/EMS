import "dotenv/config"
import connectDB from "./config/db.js"
import User from "./models/User.js"
import bcrypt from "bcrypt"
import dns from "node:dns";

const tempPass = "adminOD"

dns.setServers(["8.8.8.8", "1.1.1.1"]);

async function registerAdmin() {
    try {
        const ADMIN_EMAIL = process.env.ADMIN_EMAIL

        if(!ADMIN_EMAIL){
            console.error("Missing Admin Email env var")
            process.exit(1)
        }

        await connectDB()

        const exisitngAdmin = await User.findOne({email: process.env.ADMIN_EMAIL})

        if(exisitngAdmin){
            console.log("user already exists as role: ", exisitngAdmin.role)
            process.exit(1)
        }

        const hash = await bcrypt.hash(tempPass, 10)

        const admin = await User.create({
            email: process.env.ADMIN_EMAIL,
            password: hash,
            role: "ADMIN"
        })

        console.log("Admin user Created")
        console.log("\nemail: ", admin.email)
        console.log("password: ", tempPass)
        console.log("\nchange the password after login")

        process.exit(0)
    } catch (error) {
        console.error("Seed Failed: ", error)
    }
}

registerAdmin();