import { AuthorizationService } from "./authorization.service.js";

export class AuthorizationController {
    static async createRole(req, res, next) {
        try {
            const { name, description, permissions } = req.body
            const { projectId } = req.params

            const role = await AuthorizationService.createRole(name, permissions, projectId, description)

            return res
                .status(201)
                .json({ role })

        } catch (error) {
            next(error)
        }
    }

    static async getRoles(req, res, next) {
        try {
            const { projectId } = req.params

            const roles = await AuthorizationService.getProjectRoles(projectId)

            return res
                .status(200)
                .json({ roles })

        } catch (error) {
            next(error)
        }
    }

    static async updateRolePermissions(req, res, next) {
        try {
            const { roleId, projectId } = req.params
            const { permissions } = req.body

            const role = await AuthorizationService.updatePermissions(roleId, permissions, projectId)

            return res
                .status(200)
                .json({ role })

        } catch (error) {
            next(error)
        }
    }

    static async deleteRole(req, res, next) {
        try {
            const { roleId, projectId } = req.params

            await AuthorizationService.deleteRole(roleId, projectId)

            return res
                .status(200)
                .json({ message: 'Role Removed' })

        } catch (error) {
            next(error)
        }
    }
}