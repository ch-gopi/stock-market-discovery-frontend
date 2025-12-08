import { useState, useEffect } from "react";
import QuoteCard from "../components/QuoteCard";
import "../components/styles/qindex.css";

interface Quote {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: string;
  volume: number;
  peRatio: number;
}

export default function QuotesPage() {
  const [symbol, setSymbol] = useState("AAPL"); // default symbol
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ Dummy data injection
  useEffect(() => {
    setLoading(true);
    try {
      // Simulate fetching quote data
      const dummyQuotes: Record<string, Quote> = {
        AAPL: {
          symbol: "AAPL",
          name: "Apple Inc.",
          price: 175.20,
          change: +2.15,
          changePercent: +1.24,
          marketCap: "2.8T",
          volume: 89000000,
          peRatio: 28.5,
        },
        TSLA: {
          symbol: "TSLA",
          name: "Tesla Inc.",
          price: 250.10,
          change: -1.95,
          changePercent: -0.78,
          marketCap: "800B",
          volume: 65000000,
          peRatio: 72.3,
        },
        INFY: {
          symbol: "INFY",
          name: "Infosys Ltd.",
          price: 1450,
          change: +7.25,
          changePercent: +0.50,
          marketCap: "600B INR",
          volume: 12000000,
          peRatio: 24.1,
        },
      };

      setQuote(dummyQuotes[symbol] || dummyQuotes["AAPL"]);
    } catch (err: any) {
      setError("Failed to load dummy quote");
    } finally {
      setLoading(false);
    }
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
