import { OrganizationService } from "./organization.service.js";

export class OrganizationController {

    static async createOrg(req, res, next) {
        try {
            const { name } = req.body;
            const userId = req.user;

            const org = await OrganizationService.createOrg(userId, name);

            return res.status(201).json({ org });
        } catch (error) {
            next(error);
        }
    }

    static async getMyOrgs(req, res, next) {
        try {
            const userId = req.user;

            const orgs = await OrganizationService.getMyOrgs(userId);

            return res.status(200).json({ orgs });
        } catch (error) {
            next(error);
        }
    }

    static async getOrgById(req, res, next) {
        try {
            const userId = req.user;
            const { orgId } = req.params;

            const org = await OrganizationService.getOrgById(userId, orgId);

            return res.status(200).json({ org });
        } catch (error) {
            next(error);
        }
    }

    static async updateOrgName(req, res, next) {
        try {
            const userId = req.user;
            const { orgId } = req.params;
            const { name } = req.body;

            const updatedOrg = await OrganizationService.updateName(userId, orgId, name);

            return res.status(200).json({ org: updatedOrg });
        } catch (error) {
            next(error);
        }
    }

    static async deleteOrg(req, res, next) {
        try {
            const userId = req.user;
            const { orgId } = req.params;

            await OrganizationService.deleteOrg(userId, orgId);

            return res.status(200).json({
                message: "Organization deleted successfully"
            });
        } catch (error) {
            next(error);
        }
    }
}
