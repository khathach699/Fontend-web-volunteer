import axios from "axios";
import { InternalAxiosRequestConfig } from "axios";
import queryString from "query-string";
import { localDataNames } from "../constants/appInfos";

const baseURL = `http://192.168.100.27:3001`;

const axiosClient = axios.create({
  baseURL,
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Get token from authData in localStorage
    const authDataStr = localStorage.getItem(localDataNames.authData);
    let token = "";

    if (authDataStr) {
      try {
        const authData = JSON.parse(authDataStr);
        token = authData.token || "";
      } catch (error) {
        console.error("Failed to parse authData from localStorage:", error);
      }
    }

    console.log("Token from authData:", token);

    config.headers.set({
      Authorization: token ? `Bearer ${token}` : "",
      Accept: "Application/json",
    });
    console.log("Request headers:", config.headers);
    return config;
  }
);
axiosClient.interceptors.response.use(
  (res) => {
    if (res.data && res.status >= 200 && res.status < 300) {
      return res.data;
    } else {
      return Promise.reject(res.data);
    }
  },
  (error) => {
    const { response } = error;
    return Promise.reject(response.data);
  }
);

export default axiosClient;
