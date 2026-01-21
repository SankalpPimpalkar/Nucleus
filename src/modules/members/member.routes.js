import authenticate from "../../shared/middlewares/authenticate.js";
import authorize from "../../shared/middlewares/authorize.js";
import { PERMISSIONS } from "../authorization/constants/authorization.permissions.js";
import { MemberController } from "./member.controller.js";
import { Router } from "express";

const memberRouter = Router({ mergeParams: true })

memberRouter.post(
    '/',
    authenticate,
    authorize([PERMISSIONS.MEMBER_ADD]),
    MemberController.addMember
)
memberRouter.get(
    '/',
    authenticate,
    authorize([PERMISSIONS.MEMBER_READ]),
    MemberController.getMembers
)
memberRouter.delete(
    '/:memberId',
    authenticate,
    authorize([PERMISSIONS.MEMBER_REMOVE]),
    MemberController.removeMember
)

export default memberRouter