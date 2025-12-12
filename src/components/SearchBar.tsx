// src/components/SearchBar.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?query=${query.trim().toUpperCase()}`);
  }

  return (
    <form onSubmit={handleSearch} className="homepage-search-bar">
      <span className="search-icon">🔍</span>
      <input
      id="search"
        type="text"
        placeholder="Search stocks, ETFs, & more"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}
