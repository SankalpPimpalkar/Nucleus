import { Router } from "express";
import { AuthorizationController } from "./authorization.controller.js";
import authenticate from "../../shared/middlewares/authenticate.js";

const authorizationRouter = Router()

authorizationRouter.post('/', authenticate, AuthorizationController.createRole)
authorizationRouter.patch('/:roleId', authenticate, AuthorizationController.updateRolePermissions)
authorizationRouter.delete('/:roleId', authenticate, AuthorizationController.deleteRole)

export default authorizationRouter