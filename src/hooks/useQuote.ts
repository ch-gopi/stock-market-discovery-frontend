import { useEffect, useState } from "react";
import { QuotesService } from "../api/QuotesService";
import type{ QuoteDTO } from "../types/QuoteDTO";

export function useQuote(symbol: string) {
  const [quote, setQuote] = useState<QuoteDTO | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!symbol) return;
    setLoading(true);
    QuotesService.getQuote(symbol)
      .then(setQuote)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [symbol]);

  return { quote, loading, error };
}
