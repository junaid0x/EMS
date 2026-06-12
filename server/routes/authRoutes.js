import {Router} from "express"
import { changePassword, login, session } from "../controllers/authController";


const authrouter = Router();



authrouter.post('/login', login)
authrouter.get('/session', session)
authrouter.post('/change-password', changePassword)

export default authrouter;