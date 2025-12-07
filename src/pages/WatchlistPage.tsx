import { useWatchlist } from "../hooks/useWatchlist";
import type { WatchlistDTO } from "../types/WatchlistDTO";

export default function WatchlistPage() {
  const { watchlist, loading, error } = useWatchlist();

  return (
    <div>
      <h2>My Watchlist</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {watchlist.map((item: WatchlistDTO) => (
          <li key={item.id}>{item.symbol} (added {item.addedAt})</li>
        ))}
      </ul>
    </div>
  );
}
