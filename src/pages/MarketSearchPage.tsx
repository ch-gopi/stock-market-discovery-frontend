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

      {loading && <p>Loading...</p>}
      {error && <p className="error">Error: {error}</p>}

      <div className="search-results-grid">
        {results.length === 0 ? (
          <p>No results found.</p>
        ) : (
          results.map((item) => (
            <div key={item.symbol} className="search-result-card">
              <h3>{item.symbol}</h3>
              <p>{item.name}</p>
              <p>Price: ${item.price}</p>
              <p>Change: {item.changePercent}%</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
