import mongoose from "mongoose"

const permissionSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
        lowercase: true,
        index: true,
        unique: true
    },
}, { timestamps: true })

const PermissionModel = mongoose.model('Permission', permissionSchema)
export default PermissionModel