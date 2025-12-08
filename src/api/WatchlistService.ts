import axios from "axios";
const API_BASE = "http://localhost:8081/watchlist";

export default {
  async getAll() {
    const res = await axios.get(API_BASE);
    return res.data;
  },
  async add(symbol: string) {
    const res = await axios.post(API_BASE, { symbol });
    return res.data;
  },
  async remove(id: string) {
    const res = await axios.delete(`${API_BASE}/${id}`);
    return res.data;
  },
  async update(id: string, payload: any) {
    const res = await axios.put(`${API_BASE}/${id}`, payload);
    return res.data;
  }
};
