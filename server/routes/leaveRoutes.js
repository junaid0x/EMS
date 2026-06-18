import {Router} from "express"
import { changePassword, login, session } from "../controllers/authController.js";
import { protect, protectAdmin } from "../middleware/auth.js";
import {getProfile, updateProfile} from '../controllers/profileController.js'
import { createLeave, getLeave, updateLeaveStatus } from "../controllers/leaveController.js";


const leaveRouter= Router();


leaveRouter.post('/', protect, createLeave)
leaveRouter.get('/', protect, getLeave)
leaveRouter.patch('/:id', protect,protectAdmin, updateLeaveStatus)


export default leaveRouter;