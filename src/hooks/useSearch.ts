import { useEffect, useState } from "react";
import { MarketSearchService } from "../api/MarketSearchService";
import type{ SearchResultDTO } from "../types/SearchResultDTO";

export function useSearch(query: string) {
  const [results, setResults] = useState<SearchResultDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    MarketSearchService.search(query)
      .then(setResults)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [query]);

  return { results, loading, error };
}
