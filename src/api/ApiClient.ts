// src/api/ApiClient.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8081", // Gateway base
});

// Attach JWT automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
