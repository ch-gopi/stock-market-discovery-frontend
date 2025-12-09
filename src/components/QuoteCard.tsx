import type { QuoteDTO } from "../types/QuoteDTO";

interface Props {
  quote: QuoteDTO;
}

export default function QuoteCard({ quote }: Props) {
  // Format change percent to 2 decimals and append %
  const formattedChangePercent = `${quote.changePercent.toFixed(2)}%`;

  return (
    <div className="quote-card">
      <h3>{quote.symbol}</h3>
      <p>Price: ${quote.price.toFixed(2)}</p>
      <p>
        {quote.change >= 0 ? "▲" : "▼"} {quote.change.toFixed(2)} ({formattedChangePercent})
      </p>
      <p>Volume: {quote.volume.toLocaleString()}</p>
    </div>
  );
}
