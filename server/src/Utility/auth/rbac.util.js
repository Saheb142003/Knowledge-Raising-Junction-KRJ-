// utils/auth/rbac.util.js

export const RBAC = {
  admin: ["create", "read", "update", "delete", "manage-users", "manage-system"],
  teacher: ["create", "read", "update", "attendance", "grade"],
  student: ["read", "submit-assignment"],
  parent: ["read"],
};

export const hasRolePermission = (role, permission) => {
  return RBAC[role]?.includes(permission) || false;
};
