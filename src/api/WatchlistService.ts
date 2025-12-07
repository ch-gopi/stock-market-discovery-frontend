// src/api/WatchlistService.ts
import api from "./ApiClient";

export class WatchlistService {
  static async getWatchlist() {
    const res = await api.get(`/watchlist`);
    return res.data;
  }
}
