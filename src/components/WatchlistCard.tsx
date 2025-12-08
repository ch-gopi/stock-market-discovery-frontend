// src/components/WatchlistCard.tsx
import React from "react";
import Chart from "react-apexcharts";
import type { EnrichedWatchlistDTO } from "../hooks/useWatchlistWithQuotes";

type Props = {
  item: EnrichedWatchlistDTO;
  onRemove?: (id: string) => void;
  onAdd?: (symbol: string) => void;
  isInWatchlist?: boolean;
};

export default function WatchlistCard({ item, onRemove, onAdd, isInWatchlist }: Props) {
  const changeColor = item.changePercent >= 0 ? "#2ecc71" : "#e74c3c";
  const changeSymbol = item.changePercent >= 0 ? "▲" : "▼";

  return (
    <div className="watchlist-card">
      <div className="card-header">
        <h3>{item.symbol}</h3>
        <span>{item.name}</span>
      </div>
      <div className="card-body">
        <p className="price">${item.price.toFixed(2)}</p>
        <p className="change" style={{ color: changeColor }}>
          {changeSymbol} {item.changePercent.toFixed(2)}%
        </p>
        {item.sparkline && item.sparkline.length > 0 && (
          <Chart
            type="line"
            height={60}
            series={[{ data: item.sparkline }]}
            options={{
              chart: { sparkline: { enabled: true } },
              stroke: { width: 2 },
              tooltip: { enabled: false },
            }}
          />
        )}
      </div>
      <div className="card-actions">
        {isInWatchlist ? (
          <button onClick={() => onRemove?.(item.id)}>➖ Remove</button>
        ) : (
          <button onClick={() => onAdd?.(item.symbol)}>➕ Add</button>
        )}
      </div>
    </div>
  );
}
