import { useSearch } from "../hooks/useSearch";
import SearchBar from "../components/SearchBar";
import QuoteCard from "../components/QuoteCard";

export default function HomePage() {
  const { results, loading, error } = useSearch("AAPL");

  return (
    <div>
      <h1>Market Discovery</h1>
      <SearchBar onSearch={(q) => console.log("Search:", q)} />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div>
        {results.map((res) => (
          <QuoteCard key={res.symbol} quote={{ symbol: res.symbol, price: 0, change: 0, changePercent: 0, timestamp: "" }} />
        ))}
      </div>
    </div>
  );
}
