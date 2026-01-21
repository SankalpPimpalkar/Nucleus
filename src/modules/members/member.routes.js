import authenticate from "../../shared/middlewares/authenticate.js";
import authorize from "../../shared/middlewares/authorize.js";
import { PERMISSIONS } from "../authorization/constants/authorization.permissions.js";
import { MemberController } from "./member.controller.js";
import { Router } from "express";

const memberRouter = Router()

memberRouter.post(
    '/projects/:projectId',
    authenticate,
    authorize([PERMISSIONS.MEMBER_ADD]),
    MemberController.addMember
)
memberRouter.get(
    '/projects/:projectId',
    authenticate,
    authorize([PERMISSIONS.MEMBER_READ]),
    MemberController.getMembers
)
memberRouter.delete(
    '/:memberId/projects/:projectId',
    authenticate,
    authorize([PERMISSIONS.MEMBER_REMOVE]),
    MemberController.removeMember
)

export default memberRouter