import { Router } from "express";
import authenticate from "../../shared/middlewares/authenticate.js";
import { ProjectController } from "./project.controller.js";
import authorize from "../../shared/middlewares/authorize.js";
import { PERMISSIONS } from "../authorization/constants/authorization.permissions.js";

const projectRouter = Router()

projectRouter.post(
    '/orgs/:orgId',
    authenticate,
    ProjectController.createProject
)
projectRouter.get(
    '/orgs/:orgId',
    authenticate,
    ProjectController.getProjectsByOrg
)
projectRouter.get(
    '/:projectId',
    authenticate,
    authorize([PERMISSIONS.PROJECT_READ]),
    ProjectController.getProjectById
)
projectRouter.patch(
    '/:projectId',
    authenticate,
    authorize([PERMISSIONS.PROJECT_UPDATE]),
    ProjectController.updateProjectName
)
projectRouter.delete(
    '/:projectId',
    authenticate,
    authorize([PERMISSIONS.PROJECT_DELETE]),
    ProjectController.deleteProject
)

export default projectRouter