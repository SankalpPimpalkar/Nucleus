import { MemberService } from "./member.service.js";

export class MemberController {
    static async addMember(req, res, next) {
        try {
            const { roleId, userId } = req.body
            const { projectId } = req.params

            const newMember = await MemberService.addMember(roleId, userId, projectId)

            return res
                .status(201)
                .json({ member: newMember })

        } catch (error) {
            next(error)
        }
    }

    static async getMembers(req, res, next) {
        try {
            const { projectId } = req.params

            const members = await MemberService.getMembers(projectId)

            return res
                .status(200)
                .json({ members })

        } catch (error) {
            next(error)
        }
    }

    static async removeMember(req, res, next) {
        try {
            const { memberId } = req.params

            await MemberService.removeMember(memberId)

            return res
                .status(200)
                .json({ message: 'Member Removed' })

        } catch (error) {
            next(error)
        }
    }
}