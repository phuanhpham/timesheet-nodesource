import axios from "axios";

const BASE_URL = process.env.BASE_URL || "http://localhost:9000";

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axiosClient;
