import { NotFoundError } from "../../shared/errors/types.js";
import MemberModel from "./member.model.js";

export class MemberService {
    static async addMember(role, user, project) {
        const member = await MemberModel.create({
            role,
            user,
            project
        })

        return member
    }

    static async getMembers(projectId) {
        const members = await MemberModel
            .find({ project: projectId })
            .populate("user", "name email")
            .populate("role", "name")
            .select("-project")
            .lean()

        return members
    }

    static async removeMember(memberId) {
        const member = await MemberModel.findById(memberId)

        if (!member) {
            throw new NotFoundError('Member Not Found')
        }

        await MemberModel.findByIdAndDelete(memberId)
        return true
    }
}