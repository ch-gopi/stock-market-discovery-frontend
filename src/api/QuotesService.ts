// src/api/QuotesService.ts
import axios from "axios";

const BASE_URL = "http://localhost:8081";

const getAuthHeader = () => {
  const token = localStorage.getItem("jwt");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export class QuotesService {
  static async getQuote(symbol: string) {
    const res = await axios.get(`${BASE_URL}/quotes/${symbol}`, {
      headers: getAuthHeader(),
    });
    return res.data;
  }
}
