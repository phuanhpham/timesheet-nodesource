import axios from "axios";

const BASE_URL = "http://localhost:9000/v2";

const requestServer = axios.create({
  baseURL: BASE_URL,
  timeout: 600000,
  headers: {
    "Content-Type": "application/json",
  },
});

requestServer.interceptors.response.use(
  function (res) {
    return res;
  },
  function(error) {
    return { data : error.response.data}
  }
)

export const API = {
  requestServer,
};
