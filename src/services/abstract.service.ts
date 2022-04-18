import axios from 'axios';
import qs from 'qs';
import { CONFIG_APP } from 'src/constants/common';

const instance = axios.create({
  baseURL: CONFIG_APP.PUBLIC_URL,
  paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' }),
  timeout: 100000,
});

instance.interceptors.request.use(
  async config => {
    const idToken: string = localStorage.getItem('accessToken');
    const common: any = {
      Accept: 'application/json, text/plain, */*',
      Authorization: `Bearer ${idToken}`,
      //more settings
    };

    config.headers = common;

    return config;
  },
  error => {
    Promise.reject(error);
  },
);

instance.interceptors.response.use(
  res => {
    if (res.status === 200 && res.data) {
      return res;
    } else {
      return Promise.reject(null);
    }
  },
  async error => {
    // const originalRequest = error.config;
    // Check error;
    return Promise.reject(error);
  },
);

export default instance;