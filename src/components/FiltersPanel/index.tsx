// src/components/FiltersPanel/index.tsx
import { useState } from "react";
import { marketApi } from "../../api/marketApi";
import { StockCard } from "../StockCard";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { setSearchResults } from "../../store/quotesSlice";

export function FiltersPanel() {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const results = useAppSelector((state) => state.quotes.searchResults);

  const handleFilter = async () => {
    setLoading(true);
    try {
      const res = await marketApi.search("technology");
      dispatch(setSearchResults(res.data));
    } catch (err) {
      console.error("Filter error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleFilter} disabled={loading}>
        {loading ? "Filtering..." : "Filter Technology Stocks"}
      </button>

      <div style={{ display: "flex", flexWrap: "wrap", marginTop: "10px" }}>
        {results.map((stock) => (
          <StockCard
            key={stock.symbol}
            symbol={stock.symbol}
            price={stock.price || 0}
            change={0} // you can extend DTO to include % change
          />
        ))}
      </div>
    </div>
  );
}
