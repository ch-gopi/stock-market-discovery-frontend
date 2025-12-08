// src/components/SuggestedList.tsx
import WatchlistCard from "./WatchlistCard";

type Props = {
  suggestions: any[];
  onAdd: (symbol: string) => void;
};

export default function SuggestedList({ suggestions, onAdd }: Props) {
  return (
    <div className="suggested-list">
      <h3>Suggested for You</h3>
      <div className="watchlist-grid">
        {suggestions.map((item) => (
          <WatchlistCard
            key={item.symbol}
            item={item}
            onAdd={onAdd}
            isInWatchlist={false}
          />
        ))}
      </div>
    </div>
  );
}
