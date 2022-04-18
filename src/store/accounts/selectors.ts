import { createSelector, createSlice } from '@reduxjs/toolkit';

const account = ( state: any ) => state.account
const accountSelector = createSelector(account, account => account);

export const usersSelector:any = createSelector(
    [accountSelector],
    account => account.users,
);

export const rolesSelector:any = createSelector(
  [accountSelector],
  account => account.roles,
);

export const pageSizeSelector:any = createSelector(
  [accountSelector],
  account => account.pageSize,
);

export const pageIndexSelector:any = createSelector(
  [accountSelector],
  account => account.page,
);

export const totalPageSelector:any = createSelector(
  [accountSelector],
  account => account.totalPage,
);

export const rowCountSelector:any = createSelector(
  [accountSelector],
  account => account.rowCount,
);

export const sortColumnSelector:any = createSelector(
  [accountSelector],
  account => account.sortColumn
);

export const sortTypeSelector:any = createSelector(
  [accountSelector],
  account => account.sortType
);

export const permissionsSelector:any = createSelector(
  [accountSelector],
  account => account.permissions
)
