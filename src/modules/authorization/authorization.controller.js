import { AuthorizationService } from "./authorization.service.js";

export class AuthorizationController {
    static async createRole(req, res, next) {
        try {
            const { name, description, projectId, permissions } = req.body

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
                .status(201)
                .json({ roles })

        } catch (error) {
            next(error)
        }
    }

    static async updateRolePermissions(req, res, next) {
        try {
            const { roleId } = req.params
            const { permissions } = req.body

            const role = await AuthorizationService.updatePermissions(roleId, permissions)

            return res
                .status(200)
                .json({ role })

        } catch (error) {
            next(error)
        }
    }

    static async deleteRole(req, res, next) {
        try {
            const { roleId } = req.params

            await AuthorizationService.deleteRole(roleId)

            return res
                .status(200)
                .json({ message: 'Role Removed' })

        } catch (error) {
            next(error)
        }
    }
}