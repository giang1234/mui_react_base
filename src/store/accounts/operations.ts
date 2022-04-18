import createOperation from '../createOperation';
import * as roleService from '../../services/accounts/role/role.service';
import * as userService from '../../services/accounts/user/user.service';
import * as permissionService from '../../services/accounts/permission/permission.service';
import slice from './slice';
const { actions } = slice;

// Role
export const listRoles = createOperation({
  actions: {
    successAction: actions.listRoleSuccess,
  },
  async process(params: any) {
    return await roleService.GetListRole(params?.payload);
  },
});

export const GetRoleById = createOperation({
  actions: {
    successAction: actions.GetRoleByIdSuccess,
  },
  async process(params: any) {
    return await roleService.GetRoleById(params.payload);
  }
});

// Users
export const listUsers = createOperation({
  actions: {
    successAction: actions.listUserSuccess,
  },
  async process(params: any) {
    return await userService.GetListUser(params?.payload);
  },
});

// Permission
export const listPermissions = createOperation({
  actions: {
    successAction: actions.listPermissionSuccess,
  },
  async process(params: any) {
    return await permissionService.GetListPermissions(params?.payload);
  }
});

export const listPermissionsByRole = createOperation({
  actions: {
    successAction: actions.listPermissionsByRoleSuccess,
  },
  async process(params: any) {
    return await permissionService.GetListPermissionsByRole(params?.payload);
  }
});

export const attachPermissionToRole = createOperation({
  actions: {
    // successAction: actions.attachPermissionToRole,
  },
  async process(params: any) {
    return await permissionService.AttachPermisionToRole(params?.payload);
  }
})
