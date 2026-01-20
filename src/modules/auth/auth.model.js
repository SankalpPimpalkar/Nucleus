import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        lowercase: true
    },
    email_verified: {
        type: Boolean,
        default: false
    },
    password_hash: {
        type: String,
        required: true,
        trim: true
    },
    auth_provider: {
        type: String,
        enum: ['local', 'google'],
        required: true
    }
}, { timestamps: true })

const UserModel = mongoose.model('User', userSchema)
export default UserModel