// src/pages/MarketSearchPage.tsx
import { useSearchParams } from "react-router-dom";
// Update the import path if the hook is located elsewhere, for example:
import { useMarketSearch } from "../hooks/useMarketSearch";
// Or ensure that '../components/hooks/useMarketSearch.ts' exists and is correctly named.
 import "../components/styles/marketSearchPage.css";



export default function MarketSearchPage() {
  const [params] = useSearchParams();
  const query = params.get("q") || "";
  const { results, loading, error } = useMarketSearch(query);

  return (
    <div className="market-search-page">
      <h2>Search Results for "{query}"</h2>

      {loading && <div className="spinner">Loading...</div>}
      {error && <p className="error">Error: {error}</p>}

      <div className="search-results-grid">
        {results.length === 0 && !loading ? (
          <p>No results found.</p>
        ) : (
          results.map((item) => (
            <div key={item.symbol} className="search-result-card">
              <h3>{item.symbol}</h3>
              <p className="stock-name">{item.name}</p>
              <p>
                <strong>Region:</strong> {item.region}
              </p>
              <p>
                <strong>Currency:</strong> {item.currency}
              </p>
              <p>
                <strong>Market Hours:</strong> {item.marketOpen} – {item.marketClose}
              </p>
              <p>
                <strong>Match Score:</strong> {(item.matchScore * 100).toFixed(1)}%
              </p>
              {/* Optional enrichment if you have price/change */}
              {item.price && <p>Price: ${item.price}</p>}
              {item.changePercent && <p>Change: {item.changePercent}%</p>}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
