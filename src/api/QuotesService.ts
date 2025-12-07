// src/api/QuotesService.ts
import api from "./ApiClient";

export class QuotesService {
  static async getQuote(symbol: string) {
    const res = await api.get(`/quotes/${symbol}`);
    return res.data;
  }
}
