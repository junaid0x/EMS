import {Router} from "express"
import { changePassword, login, session } from "../controllers/authController.js";
import { protect, protectAdmin } from "../middleware/auth.js";
import { clockInOut, getAttendance } from "../controllers/attendanceController.js";


const attendanceRouter = Router();



attendanceRouter.post('/', protect, clockInOut)
attendanceRouter.get('/',protect, getAttendance)

export default attendanceRouter;