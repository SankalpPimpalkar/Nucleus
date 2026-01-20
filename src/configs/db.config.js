import mongoose from "mongoose";
import { MONGO_URI, MONGODB_NAME } from "./env.config.js";

export async function dbconnect() {
    try {
        const response = await mongoose.connect(MONGO_URI, { dbName: MONGODB_NAME })
        console.log("☘️ Mongodb connected", response.connection.host)
        return response.connection

    } catch (error) {
        console.log("❌ Mongodb failed to connect: ", error)
        process.exit(1)
    }
}