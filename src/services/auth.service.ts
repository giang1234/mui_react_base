// singin, singout, singup
import axios from './abstract.service';
import { CONFIG_APP } from "src/constants/common";

const API_URL = CONFIG_APP.API_URL;

const register = (username: string, email: string, password: string) => {
  return axios.post(`${API_URL}login`, {
    username,
    email,
    password,
  });
};

const login = (params: any): any => {
  return axios.post('clients/web/login', params).then((response: any) => {
    if (response.data && response.data.access_token) {
      localStorage.setItem("accessToken", response.data.access_token);
    }
    return response.data;
  }).catch(err => {
    return Promise.reject(err);
  });
};

const logout = () => {
  localStorage.removeItem("accessToken");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;