// src/pages/HomePage.tsx
import { SearchBar } from "../components/SearchBar";
import { QuoteTicker } from "../components/QuoteTicker";
import { StockCard } from "../components/StockCard";
import { useAppSelector } from "../hooks/reduxHooks";

export default function HomePage() {
  const results = useAppSelector((state) => state.quotes.searchResults);

  return (
    <div>
      <h1>Market Discovery</h1>
      <SearchBar />
      <QuoteTicker />
      <h2>Search Results</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {results.map((r) => (
          <StockCard
            key={r.symbol}
            symbol={r.symbol}
            price={r.price || 0}
            change={r.change || 0}
          />
        ))}
      </div>
    </div>
  );
}
