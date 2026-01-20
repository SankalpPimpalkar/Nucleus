import OrganizationModel from "./organization.model.js";
import { NotFoundError, UnauthorizedError } from "../../shared/errors/types";

export class OrganizationService {
    static #validateOwner(owner, org) {
        if (org.owner.toString() !== owner.toString()) {
            throw new UnauthorizedError('Only Organization owner can access this Org')
        }
    }

    static async createOrg(owner, name) {
        const newOrg = await OrganizationModel.create({ owner, name })
        return newOrg
    }

    static async getMyOrgs(owner) {
        const myOrgs = await OrganizationModel.find({ owner }).lean()
        return myOrgs
    }

    static async getOrgById(owner, orgId) {
        const org = await OrganizationModel.findById(orgId)

        if (!org) {
            throw new NotFoundError('Organization not Found')
        }

        this.#validateOwner(owner, org)
        return org
    }

    static async updateName(owner, orgId, updatedName) {
        const org = await OrganizationModel.findById(orgId)

        if (!org) {
            throw new NotFoundError('Organization not Found')
        }

        this.#validateOwner(owner, org)

        org.name = updatedName
        await org.save()
        return org
    }

    static async deleteOrg(owner, orgId) {
        const org = await OrganizationModel.findById(orgId)

        if (!org) {
            throw new NotFoundError('Organization not Found')
        }
        this.#validateOwner(owner, org)

        await OrganizationModel.findByIdAndDelete(orgId)
        return true
    }
}