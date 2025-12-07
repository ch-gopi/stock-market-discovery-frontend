import { useEffect, useState } from "react";
import { WatchlistService } from "../api/WatchlistService";
import type{ WatchlistDTO } from "../types/WatchlistDTO";

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState<WatchlistDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    WatchlistService.getWatchlist()
      .then(setWatchlist)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { watchlist, loading, error };
}
