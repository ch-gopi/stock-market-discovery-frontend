import type { QuoteDTO } from "../types/QuoteDTO";

interface Props {
  quote: QuoteDTO;
}

export default function QuoteCard({ quote }: Props) {
  return (
    <div className="quote-card">
      <h3>{quote.symbol}</h3>
      <p>Price: {quote.price}</p>
      <p>Change: {quote.change} ({quote.changePercent}%)</p>
      <small>{new Date(quote.timestamp).toLocaleString()}</small>
    </div>
  );
}
