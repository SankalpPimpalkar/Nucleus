import { NODE_ENV } from "../../configs/env.config.js";
import { AuthService } from "./auth.service.js";

const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: NODE_ENV === 'prod',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60
}

export class AuthController {
    static async register(req, res, next) {
        try {
            const { name, email, password } = req.body
            const result = await AuthService.register(name, email, password)
            return res
                .status(200)
                .json(result)

        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            const { token, user } = await AuthService.login(email, password)

            res.cookie('token', token, COOKIE_OPTIONS)

            return res
                .status(200)
                .json({ user })

        } catch (error) {
            next(error)
        }
    }

    static logout(req, res) {
        res.clearCookie('token');
        return res
            .status(200)
            .json({ message: 'Logged out successfully' });
    }

    static async getMe(req, res, next) {
        try {
            const userId = req.user
            const user = await AuthService.getById(userId)
            return res
                .status(200)
                .json({ user })
        } catch (error) {
            next(error)
        }
    }

    static async getUserByEmail(req, res, next) {
        try {
            const { email } = req.query
            const user = await AuthService.getUserByEmail(email)
            return res
                .status(200)
                .json({ user })

        } catch (error) {
            next(error)
        }
    }
}