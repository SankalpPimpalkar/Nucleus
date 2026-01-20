import { Router } from "express";
import { AuthController } from "./auth.controller.js";
import authenticate from "../../shared/middlewares/authenticate.js";

const authRouter = Router()

authRouter.post('/register', AuthController.register)
authRouter.post('/login', AuthController.login)
authRouter.delete('/logout', authenticate, AuthController.logout)
authRouter.get('/me', authenticate, AuthController.getMe)
authRouter.get('/', authenticate, AuthController.getUserByEmail)

export default authRouter