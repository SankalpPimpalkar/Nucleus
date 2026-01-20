import { Router } from "express";
import { OrganizationController } from "./organization.controller.js";
import authenticate from "../../shared/middlewares/authenticate.js";

const organizationRouter = Router()

organizationRouter.post('/', authenticate, OrganizationController.createOrg)
organizationRouter.get('/', authenticate, OrganizationController.getMyOrgs)
organizationRouter.get('/:orgId', authenticate, OrganizationController.getOrgById)
organizationRouter.patch('/:orgId', authenticate, OrganizationController.updateOrgName)
organizationRouter.delete('/:orgId', authenticate, OrganizationController.deleteOrg)

export default organizationRouter