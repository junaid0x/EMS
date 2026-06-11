import Employee from '../models/Employee.js'
import bcrypt from "bcrypt"
import User from "../models/User.js"

//Get employee
// GET /api/employees

export const getEmployees = async (req, res) => {
    try {
        const {department} = req.query
        const where = {}
        if(department) where.department = department

        const employees = (await Employee.find(where)).toSorted({createdAt: -1}).populate("userId", "email role").lean()

        const result = employees.map((emp)=>({
            ...emp,
            id: emp._id.toString(),
            user: emp.userId ? {email: emp.userId.email, role: emp.userId.role} : null
        }))
        return res.json(result)
    } catch (error) {
        return res.status(500).json({error: "Failed to Fetch Employee"})
    }
    
}


//Create Employee
// Post /api/employees

export const createEmployees = async (req, res) => {
    try {
        const {firstName, lastName, email, phone, position, department, basicSalary, allowances,
            deductions, joinDate, password, role, bio
        } = req.body

        if(!email  || !password || !firstName || !lastName){
            return res.status(400).json({error: "Missing reqquired fields"})
        }

        const hashed = await bcrypt.hash(password, 10)
        const user = await User.create({
            email, 
            password: hashed,
            role: role || "EMPLOYEE"
        })

        const employee = await Employee.create({
            userId: user._id,
            firstName,
            lastName, 
            email, 
            phone,
            position,
            department: department || "Engineering",
            basicSalary: Number(basicSalary) || 0,
            allowances: Number(basicSalary) || 0,
            deductions: Number(basicSalary) || 0,
            joinDate: new Date(joinDate),
            bio: bio || ""
        })

        return res.status(201).json({success: true, employee})

    } catch (error) {
        if(error.code === 11000){
            return res.status(400).json({error: "Email already exists"})
        }
        console.log("Create EMployee Error", error)
        return res.status(500).json({error: "Failed to create employee"})
    }
}

//Update Employee
// Put /api/employees/:id
export const updateEmployees = async (req, res) => {
    try {
        const {id} = req.params;
        const {firstName, lastName, email, phone, position, department, basicSalary, allowances,
            deductions, password, role, bio, employementStatus
        } = req.body

        const employee = await Employee.findById(id);
        if(!employee) return res.status(404).json({error: "Employee Not Found"})

        await Employee.findByIdAndUpdate(id, {
            firstName,
            lastName, 
            email, 
            phone,
            position,
            department: department || "Engineering",
            basicSalary: Number(basicSalary) || 0,
            allowances: Number(basicSalary) || 0,
            deductions: Number(basicSalary) || 0,
            employementStatus: employementStatus || "ACTIVE",
            bio: bio || ""
        })

        //Update User Record
        const userUpdate = {email}
        if(role) userUpdate.role = role;
        if(password) userUpdate.password = await bcrypt.hash(password, 10)
        await User.findByIdAndUpdate(employee.userId, userUpdate)

        return res.json({success: true})

    } catch (error) {
        if(error.code === 11000){
            return res.status(400).json({error: "Email already exists"})
        }
        return res.status(500).json({error: "Failed to update employee"})
    }
}

//Delete Employee
//Delete /api/employees/:id
export const deleteEmployees = async (req, res) => {
    try {
        const {id} = req.params;

        const employee = await Employee.findById(id)
        
        if(!employee) return res.status(404).json({error: "Employee not found"})
        
        employee.isDeleted = true;
        employee.employementStatus = "INACTIVE"
        await employee.save()
        return res.json({success: true})

    } catch (error) {
        return res.status(500).json({error: "Failed to delete employee"})
    }
}