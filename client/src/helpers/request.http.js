import axios from "axios";
import { LOCAL_STORAGE } from "./constans";

const BASE_URL = "http://localhost:9000/v2";

const requestServer = axios.create({
  baseURL: BASE_URL,
  timeout: 600000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});

requestServer.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization =  "Bearer " + token;
    } else {
      delete requestServer.defaults.headers.common.Authorization;
    }
    return config;
  },

  (error) => Promise.reject(error)
);

requestServer.interceptors.response.use(
  function (res) {
    return res;
  },
  function (error) {
    return {
      data: error,
    }
  }
);

export const API = {
  requestServer,
};
