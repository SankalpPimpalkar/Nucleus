import dotenv from "dotenv"
dotenv.config()

export const NODE_ENV = process.env.NODE_ENV || "dev"
export const PORT = process.env.PORT || 3000
export const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017"
export const MONGODB_NAME = process.env.DB_NAME || "nucleus_dev"
export const JWT_SECRET = process.env.JWT_SECRET || "SECRET"