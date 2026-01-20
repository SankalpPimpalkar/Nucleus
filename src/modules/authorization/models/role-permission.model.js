import mongoose from "mongoose";

const role_permissionSchema = new mongoose.Schema({
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        required: true
    },
    permissions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Permission',
            required: true
        }
    ],
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
}, { timestamps: true })

const RolePermissionModel = mongoose.model('RolePermission', role_permissionSchema)
export default RolePermissionModel
