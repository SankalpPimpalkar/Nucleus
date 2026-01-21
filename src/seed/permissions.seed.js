import { dbconnect } from "../configs/db.config.js";
import { PERMISSIONS } from "../modules/authorization/constants/authorization.permissions.js";
import PermissionModel from "../modules/authorization/models/permission.model.js";

async function seedPermissions() {
    try {
        await dbconnect()

        const permissions = Object.values(PERMISSIONS);

        for (const key of permissions) {
            await PermissionModel.updateOne(
                { key },
                { $setOnInsert: { key } },
                { upsert: true }
            );
        }

        console.log(`✅ Seeded ${permissions.length} permissions`);
        process.exit(0);
    } catch (error) {
        console.error('❌ Permission seeding failed:', error);
        process.exit(1);
    }
}

seedPermissions()