// src/components/WatchlistDashboard.tsx
import React from "react";
import { useWatchlistSocket } from "../hooks/useWatchlistSocket";

interface Props {
  userId: number;
}

export default function WatchlistDashboard({ userId }: Props) {
  const items = useWatchlistSocket(userId);

  return (
    <div>
      <h2>📊 My Watchlist</h2>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Price</th>
            <th>Change</th>
            <th>Change %</th>
          </tr>
        </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.symbol}>
                  <td>{item.symbol}</td>
                  <td>{item.lastPrice.toFixed(2)}</td>
                  <td>{item.change.toFixed(2)}</td>
                  <td>{item.changePercent.toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>

      </table>
    </div>
  );
}
