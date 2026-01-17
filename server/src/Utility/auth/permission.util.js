// utils/auth/permission.util.js

export const checkPermission = (userPermissions = [], requiredPermission) => {
  if (!userPermissions.includes(requiredPermission)) {
    return false;
  }
  return true;
};
