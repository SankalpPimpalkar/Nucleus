<h1>Nucleus API</h1>
  <p>
    A scalable backend system for authentication, organizations, projects,
    and role-based access control (RBAC).
  </p>

  <hr />

  <!-- ===================== INTRODUCTION ===================== -->
  <h2>Introduction</h2>
  <p>
    Nucleus is a backend API designed to support multi-organization,
    multi-project applications with fine-grained authorization.
    It provides a clean separation between authentication, resource ownership,
    and permissions, making it suitable for SaaS products and internal platforms.
  </p>

  <p>
    The system follows a modular architecture and emphasizes flexibility,
    security, and long-term maintainability.
  </p>

  <hr />

  <!-- ===================== CORE CONCEPTS ===================== -->
  <h2>Core Concepts</h2>

  <h3>Users</h3>
  <p>
    Users represent authenticated identities in the system. A user can belong
    to multiple projects across different organizations and may have different
    roles in each project.
  </p>

  <h3>Organizations</h3>
  <p>
    Organizations act as top-level containers. Each organization has an owner
    and can contain multiple projects. They provide logical separation between
    teams or customers.
  </p>

  <h3>Projects</h3>
  <p>
    Projects exist inside organizations and represent the main working units.
    All authorization rules, memberships, and roles are scoped at the project level.
  </p>

  <hr />

  <!-- ===================== AUTHENTICATION ===================== -->
  <h2>Authentication</h2>
  <p>
    The authentication module manages user registration, login, logout,
    and identity resolution.
  </p>

  <ul>
    <li>Email and password-based authentication</li>
    <li>Support for multiple authentication providers</li>
    <li>Session-aware user context</li>
  </ul>

  <p>
    Authentication is intentionally isolated from authorization to maintain
    a clear separation between identity and access control.
  </p>

  <hr />

  <!-- ===================== AUTHORIZATION (RBAC) ===================== -->
  <h2>Authorization (RBAC)</h2>
  <p>
    Nucleus implements a Role-Based Access Control (RBAC) system scoped
    at the project level.
  </p>

  <h3>Permissions</h3>
  <p>
    Permissions represent atomic actions that can be performed within the system.
    Each permission is identified by a unique key and describes a single capability,
    such as creating a project or managing members.
  </p>

  <h3>Roles</h3>
  <p>
    Roles are named collections of permissions defined per project.
    A role determines what actions a user can perform within that project.
  </p>

  <h3>Role Permissions</h3>
  <p>
    Role-permission mappings associate permissions with roles inside a project.
    This indirection allows permissions to be reused and reassigned without
    changing application logic.
  </p>

  <hr />

  <!-- ===================== DEFAULT PERMISSION SETS ===================== -->
  <h2>Default Permission Sets</h2>
  <p>
    Nucleus introduces the concept of predefined permission sets to simplify
    role creation and ensure consistent access control across projects.
  </p>

  <p>
    These permission sets act as templates and are commonly used when initializing
    a project or assigning default roles to users.
  </p>

  <h3>Owner</h3>
  <p>
    The Owner permission set represents full control over the organization
    and its projects. It is typically assigned to the creator or owner of
    an organization.
  </p>

  <ul>
    <li>Full organization management</li>
    <li>Full project lifecycle control</li>
    <li>Member management (add, update, remove)</li>
    <li>Role and permission management</li>
  </ul>

  <h3>Admin</h3>
  <p>
    The Admin permission set provides complete control over projects without
    organization-level ownership privileges.
  </p>

  <ul>
    <li>Project creation, updates, and deletion</li>
    <li>Member management within projects</li>
    <li>Role creation and permission assignment</li>
  </ul>

  <h3>Member</h3>
  <p>
    The Member permission set is a read-oriented role intended for contributors
    or observers with limited access.
  </p>

  <ul>
    <li>Read access to organizations and projects</li>
    <li>Visibility into members and roles</li>
    <li>No write or management permissions</li>
  </ul>

  <p>
    Default permission sets help enforce consistent access boundaries while
    still allowing custom roles to be defined when needed.
  </p>

  <hr />

  <!-- ===================== MEMBERSHIPS ===================== -->
  <h2>Memberships</h2>
  <p>
    Memberships define the relationship between users, projects, and roles.
    A membership assigns a single role to a user within a project.
  </p>

  <ul>
    <li>One membership per user per project</li>
    <li>Role-driven access control</li>
    <li>Supports role reassignment without duplication</li>
  </ul>

  <hr />

  <!-- ===================== API DESIGN ===================== -->
  <h2>API Design</h2>
  <p>
    The API follows RESTful conventions with predictable and hierarchical
    endpoints. Nested routes reflect ownership and scope, such as projects
    belonging to organizations and members belonging to projects.
  </p>

  <p>
    All endpoints and data contracts are defined using the OpenAPI 3.0
    specification and can be explored via an interactive API reference.
  </p>

  <hr />

  <!-- ===================== DOCUMENTATION ===================== -->
  <h2>API Documentation</h2>
  <p>
    The OpenAPI documentation is available in both development and production
    environments through an interactive interface.
  </p>

  <ul>
    <li>Development: <code>http://localhost:3000</code></li>
    <li>Production: <code>https://nucleus-sand.vercel.app</code></li>
  </ul>

  <hr />

  <!-- ===================== ARCHITECTURE ===================== -->
  <h2>Architecture Overview</h2>
  <p>
    Nucleus is built using a modular architecture with clear separation
    of concerns across layers and domains.
  </p>

  <ul>
    <li>Route layer for HTTP handling</li>
    <li>Service layer for business logic</li>
    <li>MongoDB with Mongoose for persistence</li>
    <li>Centralized authorization and error handling</li>
  </ul>

  <hr />

  <!-- ===================== CONCLUSION ===================== -->
  <h2>Conclusion</h2>
  <p>
    Nucleus provides a robust foundation for building secure, multi-tenant
    applications. Its RBAC system, default permission sets, and modular
    structure make it adaptable for both small teams and large-scale systems.
  </p>