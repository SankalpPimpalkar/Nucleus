import RoleModel from "./models/role.model.js";
import PermissionModel from "./models/permission.model.js";
import RolePermissionModel from "./models/role-permission.model.js";
import ProjectModel from "../projects/project.model.js";
import { NotFoundError } from "../../shared/errors/types.js";

export class AuthorizationService {
    static async #getPermissionIdsByKeys(permissionKeys = []) {
        if (!permissionKeys.length) return [];

        const permissions = await PermissionModel
            .find({ key: { $in: permissionKeys } })
            .select("_id key")
            .lean();

        if (permissions.length !== permissionKeys.length) {
            const foundKeys = permissions.map(p => p.key);
            const missingKeys = permissionKeys.filter(
                key => !foundKeys.includes(key)
            );

            throw new NotFoundError(
                `Invalid permission keys: ${missingKeys.join(", ")}`
            );
        }

        return permissions.map(p => p._id);
    }

    static async createRole(name, permissionKeys = [], projectId, description) {
        const session = await RoleModel.startSession();
        session.startTransaction();

        try {
            const project = await ProjectModel
                .findById(projectId)
                .session(session);

            if (!project) {
                throw new NotFoundError("Project Not Found");
            }

            const role = await RoleModel.create(
                [{
                    name,
                    description,
                    project: project.id
                }],
                { session }
            );

            const permissions = await this.#getPermissionIdsByKeys(permissionKeys);

            const rolePermission = await RolePermissionModel.create(
                [{
                    role: role[0].id,
                    project: project.id,
                    permissions
                }],
                { session }
            );

            await session.commitTransaction();
            session.endSession();

            return RolePermissionModel
                .findById(rolePermission[0].id)
                .populate("role", "name description")
                .populate("permissions", "key")
                .select("-project")
                .lean();

        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            throw error;
        }
    }

    static async getProjectRoles(projectId) {
        const roles = await RoleModel.find({ project: projectId }).select("name")
        return roles
    }

    static async updatePermissions(roleId, permissionKeys = []) {
        const role = await RoleModel.findById(roleId);

        if (!role) {
            throw new NotFoundError("Role Not Found");
        }

        const rolePermissions = await RolePermissionModel.findOne({
            role: role.id
        });

        if (!rolePermissions) {
            throw new NotFoundError("Role permissions not found");
        }

        const permissions = await this.#getPermissionIdsByKeys(permissionKeys);

        rolePermissions.permissions = permissions;
        await rolePermissions.save();

        return await rolePermissions
            .populate("role", "name description")
            .populate("permissions", "key")
            .select("-project");
    }

    static async deleteRole(roleId) {
        const role = await RoleModel.findById(roleId);

        if (!role) {
            throw new NotFoundError("Role Not Found");
        }

        await RolePermissionModel.deleteOne({ role: role.id });
        await RoleModel.deleteOne({ _id: role.id });

        return true;
    }

    static async deleteAllRoles(projectId) {
        await RolePermissionModel.deleteMany({ project: projectId });
        await RoleModel.deleteMany({ project: projectId });
        return true;
    }
}