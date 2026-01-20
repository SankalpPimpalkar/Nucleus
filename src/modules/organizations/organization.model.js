import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true })

const OrganizationModel = mongoose.model('Organization', organizationSchema)
export default OrganizationModel