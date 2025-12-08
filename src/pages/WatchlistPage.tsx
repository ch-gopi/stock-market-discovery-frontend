import { useState } from "react";
import { useWatchlistWithQuotes } from "../hooks/useWatchlistWithQuotes";
import WatchlistCard from "../components/WatchlistCard";
import SuggestedList from "../components/SuggestedList";
import "../components/styles/WatchlistPage.css";

export default function WatchlistPage() {
  const { watchlist, loading, error, addToWatchlist, removeFromWatchlist } =
    useWatchlistWithQuotes();
  const [symbol, setSymbol] = useState("");

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!symbol) return;
    await addToWatchlist(symbol.toUpperCase());
    setSymbol("");
  }

  // Mock suggestions (replace with API if available)
  const suggestions = [
    {
      symbol: "NIFTY",
      name: "Nifty 50",
      price: 26186.45,
      changePercent: 0.59,
      sparkline: [26000, 26100, 26186],
    },
    {
      symbol: "BTC",
      name: "Bitcoin",
      price: 812596,
      changePercent: 0.97,
      sparkline: [800000, 805000, 812596],
    },
    {
      symbol: "USDINR",
      name: "US Dollar",
      price: 0.01,
      changePercent: -0.12,
      sparkline: [0.011, 0.0105, 0.01],
    },
    {
      symbol: "ETH",
      name: "Ethereum",
      price: 275551,
      changePercent: 0.59,
      sparkline: [270000, 273000, 275551],
    },
  ];

  return (
    <div className="watchlist-page">
      <header className="watchlist-header">
        <h2>📈 My Watchlist</h2>
        <p>Track your favorite stocks, indices, and crypto assets in one place</p>
      </header>

      {/* 🔍 Add symbol form */}
      <form onSubmit={handleAdd} className="search-bar">
        <input
          type="text"
          placeholder="Enter symbol (e.g. AAPL, TSLA, INFY)"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />
        <button type="submit">➕ Add</button>
      </form>

      {loading && <p className="loading">Loading your watchlist...</p>}
      {error && <p className="error">⚠️ Error: {error}</p>}

      {/* 📊 Render watchlist */}
      <div className="watchlist-grid">
        {watchlist.length === 0 ? (
       <div className="empty-state">
            <p>🚀 Start your investing journey — add stocks to your watchlist!</p>
        <button  type="button" className="start-btn">Start</button>
      </div>


        ) : (
          watchlist.map((item) => (
            <WatchlistCard
              key={item.id}
              item={item}
              onRemove={removeFromWatchlist}
              isInWatchlist={true}
            />
          ))
        )}
      </div>

      {/* Suggested section */}
      <SuggestedList suggestions={suggestions} onAdd={addToWatchlist} />
    </div>
  );
}
