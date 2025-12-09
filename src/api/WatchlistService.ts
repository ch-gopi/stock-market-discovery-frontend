import axios from "axios";
import { getUsernameFromToken } from "../utils/getUsernameFromToken";

const api = axios.create({ baseURL: "http://localhost:8081" });

// Interceptor to attach JWT automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default {
  async getAll() {
    const res = await api.get("/watchlist");
    return res.data;
  },

  async add(symbol: string) {
    const username = getUsernameFromToken();
    const res = await api.post("/watchlist", { username, symbol });
    return res.data;
  },

  async remove(id: string) {
    const res = await api.delete(`/watchlist/${id}`);
    return res.data;
  },

  async update(id: string, payload: any) {
    const username = getUsernameFromToken();
    const res = await api.put(`/watchlist/${id}`, { ...payload, username });
    return res.data;
  }
};
