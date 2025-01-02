export type UserRole = 'ADMIN' | 'MANAGER' | 'STAFF' | 'VETERINARIAN' | 'ACCOUNTANT' | 'SUPERVISOR';

export type Permission = 
  | 'read' 
  | 'write' 
  | 'delete' 
  | 'manage'
  | 'MANAGE_TEAM'
  | 'MANAGE_HEALTH'
  | 'MANAGE_FINANCE'
  | 'VIEW_TASKS'
  | 'MANAGE_LIVESTOCK'
  | 'MANAGE_DISTRIBUTION';

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  ADMIN: ['read', 'write', 'delete', 'manage', 'MANAGE_TEAM', 'MANAGE_HEALTH', 'MANAGE_FINANCE', 'VIEW_TASKS', 'MANAGE_LIVESTOCK', 'MANAGE_DISTRIBUTION'],
  MANAGER: ['read', 'write', 'manage', 'MANAGE_TEAM', 'MANAGE_LIVESTOCK', 'MANAGE_DISTRIBUTION'],
  STAFF: ['read', 'write', 'VIEW_TASKS'],
  VETERINARIAN: ['read', 'write', 'MANAGE_HEALTH', 'MANAGE_LIVESTOCK'],
  ACCOUNTANT: ['read', 'write', 'MANAGE_FINANCE'],
  SUPERVISOR: ['read', 'write', 'manage', 'MANAGE_TEAM', 'VIEW_TASKS']
};

export const hasPermission = (role: UserRole, permission: Permission): boolean => {
  return ROLE_PERMISSIONS[role].includes(permission);
};

export const isAdmin = (role: UserRole): boolean => role === 'ADMIN';
export const isManager = (role: UserRole): boolean => role === 'MANAGER';
export const isStaff = (role: UserRole): boolean => role === 'STAFF'; 