import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        required: true
    },
}, { timestamps: true })

memberSchema.index({ user: 1, project: 1 }, { unique: true })

const MemberModel = mongoose.model('Membership', memberSchema)
export default MemberModel