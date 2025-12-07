// src/api/MarketSearchService.ts
import api from "./ApiClient";

export class MarketSearchService {
  static async search(query: string) {
    const res = await api.get(`/search`, { params: { q: query } });
    return res.data;
  }
}
