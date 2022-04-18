import { createSelector } from '@reduxjs/toolkit';

const auth = ( state: any ) => state.auth
const authSelector = createSelector(auth, auth => auth);


export const userSelector:any = createSelector(
  [authSelector],
  auth => auth.isLoggedIn,
);
