import { useQuote } from "../hooks/useQuote";
import QuoteCard from "../components/QuoteCard";

export default function QuotesPage() {
  const { quote, loading, error } = useQuote("AAPL");

  return (
    <div>
      <h2>Quotes</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {quote && <QuoteCard quote={quote} />}
    </div>
  );
}
