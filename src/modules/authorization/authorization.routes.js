import { Router } from "express";
import { AuthorizationController } from "./authorization.controller.js";
import authenticate from "../../shared/middlewares/authenticate.js";
import authorize from "../../shared/middlewares/authorize.js";
import { PERMISSIONS } from "./constants/authorization.permissions.js";

const roleRouter = Router({ mergeParams: true })

roleRouter.post(
    '/',
    authenticate,
    authorize([PERMISSIONS.ROLE_CREATE]),
    AuthorizationController.createRole
)
roleRouter.get(
    '/',
    authenticate,
    authorize([PERMISSIONS.ROLE_READ]),
    AuthorizationController.getRoles
)
roleRouter.patch(
    '/:roleId',
    authenticate,
    authorize([PERMISSIONS.ROLE_UPDATE]),
    AuthorizationController.updateRolePermissions
)
roleRouter.delete(
    '/:roleId',
    authenticate,
    authorize([PERMISSIONS.ROLE_DELETE]),
    AuthorizationController.deleteRole
)

export default roleRouter