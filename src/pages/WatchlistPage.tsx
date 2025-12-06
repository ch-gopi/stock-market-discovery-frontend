// src/pages/WatchlistPage.tsx
import { useEffect, useState } from "react";
import { userApi } from "../api/userApi";
import { StockCard } from "../components/StockCard";

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState<any[]>([]);

  useEffect(() => {
    userApi.getWatchlist().then((res) => setWatchlist(res.data));
  }, []);

  return (
    <div>
      <h2>My Watchlist</h2>
      {watchlist.map((entry) => (
        <StockCard
          key={entry.symbol}
          symbol={entry.symbol}
          price={entry.price || 0}
          change={entry.change || 0}
        />
      ))}
    </div>
  );
}
