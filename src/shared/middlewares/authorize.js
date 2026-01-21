import RolePermissionModel from "../../modules/authorization/models/role-permission.model.js";
import MemberModel from "../../modules/members/member.model.js";
import ProjectModel from "../../modules/projects/project.model.js";
import { ForbiddenError } from "../errors/types.js";

export default function authorize(requiredPermissions = []) {
    return async function (req, res, next) {
        try {
            const userId = req.user;
            const { projectId } = req.params;

            if (!projectId) {
                throw new ForbiddenError("Project context is missing");
            }

            const project = await ProjectModel.findById(projectId);

            if (!project) {
                throw new ForbiddenError("Project not found");
            }

            if (userId.toString() === project.created_by.toString()) {
                return next();
            }

            if (!requiredPermissions.length) {
                return next();
            }

            const member = await MemberModel.findOne({
                user: userId,
                project: projectId
            });

            if (!member) {
                throw new ForbiddenError("Not a project member");
            }

            const rolePermissions = await RolePermissionModel
                .findOne({ role: member.role })
                .populate("permissions", "key")
                .populate("role", "name")
                .select("-project")
                .lean();

            if (!rolePermissions) {
                throw new ForbiddenError("Role permissions not configured");
            }

            const memberPermissions = new Set(
                rolePermissions.permissions.map(p => p.key)
            );

            const hasAllPermissions = requiredPermissions.every(
                perm => memberPermissions.has(perm)
            );

            if (!hasAllPermissions) {
                throw new ForbiddenError("Insufficient permissions");
            }

            return next();

        } catch (error) {
            next(error);
        }
    };
}
