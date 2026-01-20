import { NotFoundError, UnauthorizedError } from "../../shared/errors/types.js";
import ProjectModel from "./project.model.js";
import OrganizationModel from "../organizations/organization.model.js";
import eventBus from "../../shared/events/EventBus.js";

export class ProjectService {

    static #validateOrgOwner(user, org) {
        if (org.owner.toString() !== user.toString()) {
            throw new UnauthorizedError(
                "Only organization owner can manage projects"
            );
        }
    }

    static async createProject(orgId, name, user) {
        const org = await OrganizationModel.findById(orgId);

        if (!org) {
            throw new NotFoundError("Organization not found");
        }

        this.#validateOrgOwner(user, org);

        const newProject = await ProjectModel.create({
            name,
            created_by: user,
            organization: orgId
        });

        await eventBus.emit('project:created', { projectId: newProject.id })

        return newProject;
    }

    static async getProjectsByOrg(orgId, user) {
        const org = await OrganizationModel.findById(orgId);

        if (!org) {
            throw new NotFoundError("Organization not found");
        }

        this.#validateOrgOwner(user, org);

        const projects = await ProjectModel
            .find({ organization: orgId })
            .lean();

        return projects;
    }

    static async getProjectById(projectId, user) {
        const project = await ProjectModel
            .findById(projectId)
            .populate("organization");

        if (!project) {
            throw new NotFoundError("Project not found");
        }

        this.#validateOrgOwner(user, project.organization);

        return project;
    }

    static async updateProjectName(projectId, name, user) {
        const project = await ProjectModel
            .findById(projectId)
            .populate("organization");

        if (!project) {
            throw new NotFoundError("Project not found");
        }

        this.#validateOrgOwner(user, project.organization);

        project.name = name;
        await project.save();

        return project;
    }

    static async deleteProject(projectId, user) {
        const project = await ProjectModel
            .findById(projectId)
            .populate("organization");

        if (!project) {
            throw new NotFoundError("Project not found");
        }

        this.#validateOrgOwner(user, project.organization);

        eventBus.emit('project:deleted', { projectId })
        await ProjectModel.findByIdAndDelete(projectId);

        return true;
    }
}
