import eventBus from "../../shared/events/EventBus.js";
import { AuthorizationService } from "./authorization.service.js";
import DEFAULT_PROJECT_ROLES from "./defaults.js";

eventBus.on('project:created', async ({ projectId }) => {
    console.log("(PROJECT CREATED)", projectId)
    for (const role of DEFAULT_PROJECT_ROLES) {
        await AuthorizationService.createRole(
            role.name,
            role.permissions,
            projectId
        );
    }
})

eventBus.on('project:deleted', async ({ projectId }) => {
    console.log("(PROJECT DELETED)", projectId)
    await AuthorizationService.deleteAllRoles(projectId)
})