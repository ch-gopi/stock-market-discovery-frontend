import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:8081" });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default {
  async get(userId: number) {
    const res = await api.get(`/watchlist/${userId}`);
    return res.data;
  },

  async add(userId: number, symbol: string) {
    const res = await api.post("/watchlist", { userId, symbol });
    return res.data;
  },

  async remove(userId: number, symbol: string) {
    const res = await api.delete("/watchlist", { data: { userId, symbol } });
    return res.data;
  },

  async update(userId: number, symbol: string, payload: any) {
    const res = await api.put("/watchlist", { userId, symbol, ...payload });
    return res.data;
  }
};
