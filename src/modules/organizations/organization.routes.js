import { Router } from "express";
import { OrganizationController } from "./organization.controller.js";
import authenticate from "../../shared/middlewares/authenticate.js";
import projectRouter from "../projects/project.routes.js";

const organizationRouter = Router()

organizationRouter.post(
    '/',
    authenticate,
    OrganizationController.createOrg
)
organizationRouter.get(
    '/',
    authenticate,
    OrganizationController.getMyOrgs
)
organizationRouter.get(
    '/:orgId',
    authenticate,
    OrganizationController.getOrgById
)
organizationRouter.patch(
    '/:orgId',
    authenticate,
    OrganizationController.updateOrgName
)
organizationRouter.delete(
    '/:orgId',
    authenticate,
    OrganizationController.deleteOrg
)

organizationRouter.use('/:orgId/projects', projectRouter)

export default organizationRouter