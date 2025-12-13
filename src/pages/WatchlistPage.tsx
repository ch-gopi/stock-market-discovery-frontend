// src/pages/WatchlistPage.tsx
import { useState, useEffect } from "react";
import WatchlistCard from "../components/WatchlistCard";
import SuggestedList from "../components/SuggestedList";
import "../components/styles/WatchlistPage.css";
import { useWatchlistSocket } from "../hooks/useWatchlistSocket";
import api from "../api/WatchlistService";
import { getUserIdFromToken } from "../utils/auth";

// Align with backend response
export interface EnrichedWatchlistDTO {
  symbol: string;
  lastPrice: number;
  change: number;
  changePercent: number;
  sparkline: number[];
}

export default function WatchlistPage() {
  const userId: number | null = getUserIdFromToken();
  const liveItems = useWatchlistSocket(userId ?? 0);

  const [watchlist, setWatchlist] = useState<EnrichedWatchlistDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [symbol, setSymbol] = useState("");

  // Load initial watchlist
  useEffect(() => {
    async function fetchWatchlist() {
      try {
        if (userId !== null) {
          const data = await api.getAll(userId); // corrected
          setWatchlist(data);
        }
      } catch {
        setError("Failed to load watchlist");
      } finally {
        setLoading(false);
      }
    }
    if (userId !== null) fetchWatchlist();
    else setLoading(false);
  }, [userId]);

  // Merge live updates
  useEffect(() => {
    if (liveItems.length > 0) {
      setWatchlist((prev) =>
        prev.map((item) => {
          const live = liveItems.find((li) => li.symbol === item.symbol);
          return live
            ? { ...item, lastPrice: live.lastPrice, changePercent: live.changePercent }
            : item;
        })
      );
    }
  }, [liveItems]);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!symbol || userId === null) return;
    try {
      const newItem = await api.add(userId, symbol.toUpperCase());
      setWatchlist((prev) => [...prev, newItem]);
      setSymbol("");
    } catch {
      setError("Failed to add symbol");
    }
  }

  async function handleRemove(symbol: string) {
    if (userId === null) return;
    try {
      await api.remove(userId, symbol);
      setWatchlist((prev) => prev.filter((item) => item.symbol !== symbol));
    } catch {
      setError("Failed to remove symbol");
    }
  }

  // If no user logged in
  if (userId === null) {
    return (
      <div className="watchlist-page">
        <header className="watchlist-header">
          <h2>📈 My Watchlist</h2>
          <p>Please log in to view and manage your watchlist.</p>
        </header>
      </div>
    );
  }

  return (
    <div className="watchlist-page">
      <header className="watchlist-header">
        <h2>📈 My Watchlist</h2>
        <p>Track your favorite stocks, indices, and crypto assets in one place</p>
      </header>

      {/* Add symbol form */}
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
      {error && <p className="error">⚠️ {error}</p>}

      {/* Render watchlist */}
      <div className="watchlist-grid">
        {watchlist.length === 0 ? (
          <div className="empty-state">
            <p>🚀 Start your investing journey — add stocks to your watchlist!</p>
            <button type="button" className="start-btn">Start</button>
          </div>
        ) : (
          watchlist.map((item) => (
            <WatchlistCard
              key={item.symbol}
              item={item}
              onRemove={handleRemove}
              isInWatchlist={true}
            />
          ))
        )}
      </div>

      {/* Suggested section */}
      <SuggestedList
        suggestions={[]}
        onAdd={(s) => {
          if (userId !== null) {
            api.add(userId, s);
          }
        }}
      />
    </div>
  );
}
