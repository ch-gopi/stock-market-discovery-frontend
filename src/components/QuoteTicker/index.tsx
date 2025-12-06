// src/components/QuoteTicker/index.tsx
import { useEffect, useState } from "react";
import { quotesApi } from "../../api/quotesApi";

export function QuoteTicker() {
  const [quote, setQuote] = useState<any>(null);

  useEffect(() => {
    const ws = quotesApi.subscribe(["AAPL"]);
    ws.onmessage = (e) => setQuote(JSON.parse(e.data));
    return () => ws.close();
  }, []);

  return (
    <div>
      {quote ? (
        <span>
          {quote.symbol}: {quote.price} ({quote.changePercent}%)
        </span>
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
}
