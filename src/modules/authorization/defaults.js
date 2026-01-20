const DEFAULT_PROJECT_ROLES = [
    {
        name: 'Project Admin',
        permissions: [
            'project:read',
            'project:update',
            'member:add',
            'role:update'
        ]
    },
    {
        name: 'Member',
        permissions: ['project:read']
    }
];

export default DEFAULT_PROJECT_ROLES