// src/pages/QuotesPage.tsx
import { useState, useEffect } from "react";
import QuoteCard from "../components/QuoteCard";
import "../components/styles/qindex.css";
import { QuotesService } from "../api/QuotesService";
import type{ QuoteDTO } from "../types/QuoteDTO";  // <-- matches backend QuoteDto

export default function QuotesPage() {
  const [symbol, setSymbol] = useState("AAPL"); // default symbol
  const [quote, setQuote] = useState<QuoteDTO | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🔄 Fetch live quote whenever symbol changes
  useEffect(() => {
    async function fetchQuote() {
      setLoading(true);
      setError(null);
      try {
        const data = await QuotesService.getQuote(symbol);
        setQuote(data);
      } catch (err: any) {
        console.error("Failed to fetch quote", err);
        setError("Failed to load quote from backend");
      } finally {
        setLoading(false);
      }
    }
    fetchQuote();
  }, [symbol]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    // ✅ Quote will update automatically when `symbol` changes
  }

  return (
    <div className="quotes-page">
      <h2>Quotes</h2>

      {/* 🔍 Search bar */}
      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          placeholder="Enter stock symbol (e.g. AAPL, TSLA, INFY)"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
        />
        <button type="submit">Search</button>
      </form>

      {/* 📊 Render results */}
      {loading && <p>Loading...</p>}
      {error && <p className="error">Error: {error}</p>}
      {quote && <QuoteCard quote={quote} />}
    </div>
  );
}
