// src/components/SearchResults.tsx
import { useSearchParams } from "react-router-dom";
import { useMarketSearch } from "../hooks/useMarketSearch";
import "../components/styles/searchResults.css";

export default function SearchResults() {
  const [params] = useSearchParams();
  const query = params.get("query") || ""; 

  const { results, loading, error } = useMarketSearch(query);

  return (
    <div className="search-results">
      <h2>Search Results for "{query}"</h2>

      {loading && <div className="spinner">Loading...</div>}
      {error && <p className="error">Error: {error}</p>}

      <div className="results-grid">
        {results.length === 0 && !loading ? (
          <p>No results found.</p>
        ) : (
          results.map((stock) => (
            <div key={stock.symbol} className="stock-card">
              <h3>{stock.symbol}</h3>
              <p className="stock-name">{stock.name}</p>
              <p>
                <strong>Region:</strong> {stock.region}
              </p>
              <p>
                <strong>Currency:</strong> {stock.currency}
              </p>
              <p>
                <strong>Market Hours:</strong> {stock.marketOpen} – {stock.marketClose} ({stock.timezone})
              </p>
              <p>
                <strong>Match Score:</strong> {(stock.matchScore * 100).toFixed(1)}%
              </p>
              {/* Optional enrichment if your hook provides price/change */}
              {stock.price && <p>Price: ${stock.price}</p>}
              {stock.changePercent && <p>Change: {stock.changePercent}%</p>}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
