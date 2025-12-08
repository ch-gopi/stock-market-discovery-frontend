// src/api/HistoricalService.ts
import axios from "axios";

const BASE_URL = "http://localhost:8081";

const getAuthHeader = () => {
  const token = localStorage.getItem("jwt");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export class HistoricalService {
  static async getHistory(symbol: string, range: string) {
    const res = await axios.get(`${BASE_URL}/historical/${symbol}`, {
      params: { range },
      headers: getAuthHeader(), // ✅ attach Bearer token
    });
    return res.data;
  }
}

