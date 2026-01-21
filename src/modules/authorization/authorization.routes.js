import { Router } from "express";
import { AuthorizationController } from "./authorization.controller.js";
import authenticate from "../../shared/middlewares/authenticate.js";
import authorize from "../../shared/middlewares/authorize.js";
import { PERMISSIONS } from "./constants/authorization.permissions.js";

const authorizationRouter = Router()

authorizationRouter.post(
    '/projects/:projectId',
    authenticate,
    authorize([PERMISSIONS.ROLE_CREATE]),
    AuthorizationController.createRole
)
authorizationRouter.get(
    '/projects/:projectId',
    authenticate,
    authorize([PERMISSIONS.ROLE_READ]),
    AuthorizationController.getRoles
)
authorizationRouter.patch(
    '/:roleId/projects/:projectId',
    authenticate,
    authorize([PERMISSIONS.ROLE_UPDATE]),
    AuthorizationController.updateRolePermissions
)
authorizationRouter.delete(
    '/:roleId/projects/:projectId',
    authenticate,
    authorize([PERMISSIONS.ROLE_DELETE]),
    AuthorizationController.deleteRole
)

export default authorizationRouter