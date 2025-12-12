// src/components/QuotesDashboard.tsx
import React from "react";
import  useQuotesSocket  from "../hooks/useQuotesSocket";

export default function QuotesDashboard() {
  const quotes = useQuotesSocket();

  return (
    <div>
      <h2>📈 Live Quotes</h2>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Price</th>
            <th>Change</th>
            <th>Change %</th>
            <th>Volume</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(quotes).map((q) => (
            <tr key={q.symbol}>
              <td>{q.symbol}</td>
              <td>{q.price.toFixed(2)}</td>
              <td>{q.change.toFixed(2)}</td>
              <td>{q.changePercent.toFixed(2)}%</td>
              <td>{q.volume}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
