import express from "express"
import morgan from "morgan"
import cors from "cors"
import cookieParser from "cookie-parser"
import { errorHandler } from "./shared/errors/handler.js"
import authRouter from "./modules/auth/auth.routes.js"
import organizationRouter from "./modules/organizations/organization.routes.js"
import { apiReference } from '@scalar/express-api-reference'
import "./modules/authorization/authorization.listener.js"

const app = express()

// Middlewares
app.use('/docs', express.static('docs'))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(cookieParser())

// Routes
app.use(
    '/',
    apiReference({
        url: '/docs/nucleus.yaml',
    }),
)

app.use('/api/auth', authRouter)
app.use('/api/orgs', organizationRouter)

// Global Error Handler
app.use(errorHandler)

export default app