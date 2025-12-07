import { useEffect, useState } from "react";
import { HistoricalService } from "../api/HistoricalService";
import type { HistoricalDTO } from "../types/HistoricalDTO";

export function useHistory(symbol: string, range: string) {
  const [history, setHistory] = useState<HistoricalDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!symbol) return;
    setLoading(true);
    HistoricalService.getHistory(symbol, range)
      .then(setHistory)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [symbol, range]);

  return { history, loading, error };
}
