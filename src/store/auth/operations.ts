import createOperation from '../createOperation';
import slice from './slice';
import authService from 'src/services/auth.service';

const { actions } = slice;

export const login = createOperation({
  actions: {
    successAction: actions.loginFulfilled,
    failedAction: actions.loginRejected
  },
  async process({ payload: data }) {
    const params = data
    return await authService.login(params);
  },
});

export const logout = createOperation({
  actions: {
    successAction: actions.logoutFulfilled
  },
  async process() {
    return await authService.logout();
  },
});