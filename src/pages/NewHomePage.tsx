import { useState } from "react";
import MarketSearchService from "../api/MarketSearchService";
import Chart from "react-apexcharts";

export default function NewHomePage() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState<any[]>([]);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    try {
      const response = await MarketSearchService.search(query);
      // ✅ use response.data, not response itself
      setData(response.data);
    } catch (error) {
      console.error("Search failed:", error);
      setData([]);
    }
  }

  function handleLogout() {
    localStorage.removeItem("token"); // ✅ match your AuthService storage key
    sessionStorage.clear();
    window.location.href = "/"; // back to public homepage
  }

  return (
    <div className="new-homepage">
      {/* ✅ Minimal header */}
      <header className="dashboard-header">
        <h1>FinTech Dashboard</h1>
        <form
          onSubmit={handleSearch}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            maxWidth: "900px",
            margin: "30px auto",
            borderRadius: "50px",
            boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
            overflow: "hidden",
            background: "linear-gradient(90deg, #0F2027, #203A43, #2C5364)",
          }}
        >
          <input
            type="text"
            placeholder="🔍 Search stocks, indices, ETFs, crypto..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              padding: "20px 25px",
              fontSize: "20px",
              border: "none",
              outline: "none",
              color: "#fff",
              background: "transparent",
              fontWeight: "500",
              letterSpacing: "0.5px",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "20px 40px",
              fontSize: "20px",
              fontWeight: "bold",
              border: "none",
              cursor: "pointer",
              background: "linear-gradient(135deg, #E94560, #FF6B6B)",
              color: "white",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.background =
                "linear-gradient(135deg, #b30000, #E94560)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.background =
                "linear-gradient(135deg, #E94560, #FF6B6B)")
            }
          >
            Search
          </button>
        </form>
        {/** ✅ Logout button only if logged in */}
        {localStorage.getItem("token") && (
          <button
            onClick={handleLogout}
            style={{
              marginTop: "15px",
              background: "transparent",
              border: "2px solid #E94560",
              borderRadius: "25px",
              padding: "8px 20px",
              color: "#fff",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Logout
          </button>
        )}
      </header>

      <div className="charts">
        {data.length > 0 && (
          <Chart
            type="line"
            series={[{ name: "Price", data: data.map((d) => d.price) }]}
            options={{
              chart: { animations: { enabled: true } },
              xaxis: { categories: data.map((d) => d.timestamp) },
              title: { text: query.toUpperCase(), align: "center" },
            }}
          />
        )}
      </div>

      <footer className="footer">© 2025 Market Discovery Platform</footer>
    </div>
  );
}
