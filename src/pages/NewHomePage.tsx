import { useState } from "react";
import MarketSearchService from "../api/MarketSearchService";
import Chart from "react-apexcharts";
import "../components/styles/index.css";

export default function NewHomePage() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState<any[]>([]);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    try {
      const response = await MarketSearchService.search(query);
      setData(response.data);
    } catch (error) {
      console.error("Search failed:", error);
      setData([]);
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    sessionStorage.clear();
    window.location.href = "/";
  }

  return (
    <div className="new-homepage">
      <header className="dashboard-header">
        <h1>FinTech Dashboard</h1>
        <form onSubmit={handleSearch} className="search-bar">
          <input
            type="text"
            placeholder="🔍 Search stocks, indices, ETFs, crypto..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        {localStorage.getItem("token") && (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </header>

      <div className="stock-section">
        {data.length > 0 &&
          data.map((stock, idx) => (
            <div key={idx} className="stock-card">
              <h2>{stock.symbol} — {stock.name}</h2>
              <p><strong>Type:</strong> {stock.type}</p>
              <p><strong>Region:</strong> {stock.region} ({stock.timezone})</p>
              <p><strong>Market Hours:</strong> {stock.marketOpen} - {stock.marketClose}</p>
              <p><strong>Currency:</strong> {stock.currency}</p>
              <p><strong>Price:</strong> ${stock.price}</p>
              <p className={stock.change >= 0 ? "positive" : "negative"}>
                {stock.change >= 0 ? "▲" : "▼"} {stock.change} ({stock.changePercent}%)
              </p>
              <p><strong>Volume:</strong> {stock.volume.toLocaleString()}</p>
              <p><strong>Prev Close:</strong> ${stock.historicalPerformance}</p>
            </div>
          ))}
      </div>

      <div className="charts">
        {data.length > 0 && (
          <Chart
            type="line"
            series={[{ name: "Price", data: data.map((d) => d.price) }]}
            options={{
              chart: { animations: { enabled: true } },
              xaxis: { categories: data.map((d) => d.timestamp ?? "") },
              title: { text: query.toUpperCase(), align: "center" },
            }}
          />
        )}
      </div>

      <footer className="footer">© 2025 Market Discovery Platform</footer>
    </div>
  );
}
