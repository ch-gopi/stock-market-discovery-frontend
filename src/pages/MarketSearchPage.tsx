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
 <div className="search-results-grid">
  {results.length === 0 && !loading ? (
    <p>No results found.</p>
  ) : (
    results.map((item) => (
      <div key={item.symbol} className="search-result-card">
        <h3>{item.symbol}</h3>
        <p className="stock-name">{item.name}</p>
      <p>
  <strong>Region:</strong> {item.region ?? "Global Exchange"}
</p>
      <p>
        <strong>Currency:</strong> {item.currency ?? "USD"}
      </p>
      <p>
        <strong>Market Hours:</strong> {item.marketOpen ?? "09:30"} – {item.marketClose ?? "16:00"}
      </p>
      <p>
        <strong>Timezone:</strong> {item.timezone ?? "UTC-04/UTC-05 (ET)"}
      </p>
      <p>
        <strong>Match Score:</strong> {((item.matchScore ?? 1.0) * 100).toFixed(1)}%
      </p>

        {item.price && <p>Price: ${item.price}</p>}
        {item.changePercent && <p>Change: {item.changePercent}%</p>}
      </div>
    ))
  )}
</div>

  );
}
