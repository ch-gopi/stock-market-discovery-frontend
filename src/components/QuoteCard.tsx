// src/components/QuoteCard.tsx
import React from "react";

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

export default function QuoteCard({ quote }: { quote: Quote }) {
  const changeColor = quote.change >= 0 ? "#00ff99" : "#ff4d4d";
  const changeSymbol = quote.change >= 0 ? "▲" : "▼";

  return (
    <div className="quote-card">
      <h3>{quote.symbol} - {quote.name}</h3>
      <p>Price: ₹{quote.price}</p>
      <p style={{ color: changeColor }}>
        {changeSymbol} {quote.change} ({quote.changePercent}%)
      </p>
      <p>Market Cap: {quote.marketCap}</p>
      <p>Volume: {quote.volume.toLocaleString()}</p>
      <p>P/E Ratio: {quote.peRatio}</p>
    </div>
  );
}
