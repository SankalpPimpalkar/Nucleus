import { ProjectService } from "./project.service.js";

export class ProjectController {

    static async createProject(req, res, next) {
        try {
            const { orgId } = req.params;
            const { name } = req.body;
            const userId = req.user;

            const project = await ProjectService.createProject(
                orgId,
                name,
                userId
            );

            return res.status(201).json({ project });
        } catch (error) {
            next(error);
        }
    }

    static async getProjectsByOrg(req, res, next) {
        try {
            const { orgId } = req.params;
            const userId = req.user;

            const projects = await ProjectService.getProjectsByOrg(
                orgId,
                userId
            );

            return res.status(200).json({ projects });
        } catch (error) {
            next(error);
        }
    }

    static async getProjectById(req, res, next) {
        try {
            const { projectId } = req.params;
            const userId = req.user;

            const project = await ProjectService.getProjectById(
                projectId,
                userId
            );

            return res.status(200).json({ project });
        } catch (error) {
            next(error);
        }
    }

    static async updateProjectName(req, res, next) {
        try {
            const { projectId } = req.params;
            const { name } = req.body;
            const userId = req.user;

            const updatedProject = await ProjectService.updateProjectName(
                projectId,
                name,
                userId
            );

            return res.status(200).json({ project: updatedProject });
        } catch (error) {
            next(error);
        }
    }

    static async deleteProject(req, res, next) {
        try {
            const { projectId } = req.params;
            const userId = req.user;

            await ProjectService.deleteProject(
                projectId,
                userId
            );

            return res.status(200).json({
                message: "Project deleted successfully"
            });
        } catch (error) {
            next(error);
        }
    }
}
