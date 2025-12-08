// src/hooks/useMarketSearch.ts
import { useEffect, useState } from "react";
import searchMarket from "../api/MarketSearchService";

export function useMarketSearch(query: string) {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetch() {
      if (!query) return;
      setLoading(true);
      try {
        const response = await searchMarket.search(query);
        setResults(response.data || []);
        console.log("Search results:", response.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, [query]);

  return { results, loading, error };
}
