// src/hooks/useWatchlistWithQuotes.ts
import { useEffect, useState } from "react";
import WatchlistService from "../api/WatchlistService";
import axios from "axios";
import type { WatchlistDTO } from "../types/WatchlistDTO";

export interface EnrichedWatchlistDTO extends WatchlistDTO {
  name: string;
  price: number;
  changePercent: number;
  sparkline: number[];
}

export function useWatchlistWithQuotes() {
  const [watchlist, setWatchlist] = useState<EnrichedWatchlistDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchWatchlist() {
    setLoading(true);
    try {
      const baseItems: WatchlistDTO[] = await WatchlistService.getAll();

      const enriched = await Promise.all(
        baseItems.map(async (item) => {
          try {
            // Quotes API
            const quoteRes = await axios.get(`http://localhost:8081/quotes/${item.symbol}`);
            const quote = quoteRes.data;

            // Historical API (sparkline)
            const histRes = await axios.get(
              `http://localhost:8081/historical/${item.symbol}?range=1mo`
            );
            const history = histRes.data;

            return {
              ...item,
              name: quote.name,
              price: quote.price,
              changePercent: quote.changePercent,
              sparkline: history.map((h: any) => h.close),
            };
          } catch (err) {
            console.error("Failed to enrich item:", item.symbol, err);
            return { ...item, name: item.symbol, price: 0, changePercent: 0, sparkline: [] };
          }
        })
      );

      setWatchlist(enriched);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function addToWatchlist(symbol: string) {
    await WatchlistService.add(symbol);
    await fetchWatchlist();
  }

  async function removeFromWatchlist(id: string) {
    await WatchlistService.remove(id);
    await fetchWatchlist();
  }

  useEffect(() => {
    fetchWatchlist();
  }, []);

  return { watchlist, loading, error, addToWatchlist, removeFromWatchlist };
}
