// src/api/HistoricalService.ts
import api from "./ApiClient";

export class HistoricalService {
  static async getHistory(symbol: string, range: string) {
    const res = await api.get(`/historical/${symbol}`, { params: { range } });
    return res.data;
  }
}
