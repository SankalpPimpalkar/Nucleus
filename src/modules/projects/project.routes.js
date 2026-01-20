import { Router } from "express";
import authenticate from "../../shared/middlewares/authenticate.js";
import { ProjectController } from "./project.controller.js";

const projectRouter = Router()

projectRouter.post(':orgId', authenticate, ProjectController.createProject)
projectRouter.get(':orgId', authenticate, ProjectController.getProjectsByOrg)
projectRouter.get(':projectId', authenticate, ProjectController.getProjectById)
projectRouter.patch(':projectId', authenticate, ProjectController.updateProjectName)
projectRouter.delete(':projectId', authenticate, ProjectController.deleteProject)

export default projectRouter