// src/components/SearchBar/index.tsx
import { useState } from "react";
import { marketApi } from "../../api/marketApi";
import { useDebounce } from "../../hooks/useDebounce";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { setSearchResults } from "../../store/quotesSlice";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const debounced = useDebounce(query, 300);
  const dispatch = useAppDispatch();

  const handleSearch = async () => {
    if (debounced) {
      const res = await marketApi.search(debounced);
      dispatch(setSearchResults(res.data));
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search stocks..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
