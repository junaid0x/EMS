import {Router} from "express"
import { changePassword, login, session } from "../controllers/authController.js";
import { protect, protectAdmin } from "../middleware/auth.js";
import {getProfile, updateProfile} from '../controllers/profileController.js'


const profileRouter= Router();



profileRouter.get('/', protect, getProfile)
profileRouter.post('/', protect, updateProfile)


export default profileRouter;