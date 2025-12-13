import React from "react";
import Chart from "react-apexcharts";

export interface EnrichedWatchlistDTO {
  symbol: string;
  lastPrice: number;
  change: number;
  changePercent: number;
  sparkline: number[];
}

type Props = {
  item: EnrichedWatchlistDTO;
  onRemove?: (symbol: string) => void;
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
      </div>
      <div className="card-body">
        <p className="price">${item.lastPrice.toFixed(2)}</p>
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
          <button type="button" onClick={() => onRemove?.(item.symbol)}>➖ Remove</button>
        ) : (
          <button type="button" onClick={() => onAdd?.(item.symbol)}>➕ Add</button>
        )}
      </div>
    </div>
  );
}
