import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    }
}, { timestamps: true })

roleSchema.index({ name: 1, project: 1 }, { unique: true })

const RoleModel = mongoose.model('Role', roleSchema)
export default RoleModel