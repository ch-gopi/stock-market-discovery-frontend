// src/api/axiosClient.ts
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8081", // backend service or gateway
});

export default axiosClient;
