import axios from "axios";
import {
  getAccessToken,

  removeTokens,
} from "@helpers/localStorage";
import store from "@root/store.jsx";
import { LOGOUT } from "@root/redux/types";
import CONF from "@root/config.json";


const axiosAdapter = axios.create({
  baseURL: CONF.BASE_URL,
});

axiosAdapter.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "application/json";
    const token = getAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${JSON.parse(token)}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosAdapter.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error && error.response) {
      const { status } = error.response;
      if (status === 401) {

        store.dispatch({ type: LOGOUT });
        removeTokens();
      }
    }
    return Promise.reject(error);
  }
);

export default axiosAdapter;

