import express from "express"
import morgan from "morgan"
import cors from "cors"
import cookieParser from "cookie-parser"
import { errorHandler } from "./shared/errors/handler.js"
import authRouter from "./modules/auth/auth.routes.js"
import organizationRouter from "./modules/organizations/organization.routes.js"
import projectRouter from "./modules/projects/project.routes.js"
import authorizationRouter from "./modules/authorization/authorization.routes.js"

const app = express()

// Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(cookieParser())

// Routes
app.get('/', (req, res) => {
    return res.send("Hello World").status(200)
})

app.use('/api/auth', authRouter)
app.use('/api/authorization', authorizationRouter)
app.use('/api/organizations', organizationRouter)
app.use('/api/projects', projectRouter)

// Global Error Handler
app.use(errorHandler)

export default app