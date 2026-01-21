import { PERMISSION_SETS } from "./constants/authorization.permissionsets.js";

const DEFAULT_PROJECT_ROLES = [
    {
        name: 'Admin',
        permissions: PERMISSION_SETS.ADMIN
    },
    {
        name: 'Member',
        permissions: PERMISSION_SETS.MEMBER
    },
    {
        name: 'Owner',
        permissions: PERMISSION_SETS.OWNER
    },
];

export default DEFAULT_PROJECT_ROLES