import { useEffect, useMemo, useState } from "react";
import Chart from "react-apexcharts";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import useQuotesSocket, { type QuoteDto } from "../hooks/useQuotesSocket";
import "../components/styles/HomePage.css";

interface IndexPoint {
  timestamp: string;
  price: number;
}

// Map raw provider symbols → friendly names for display
const indexSymbolMap: Record<string, string> = {
  "OANDA:SPX500_USD": "SP500",    // S&P 500 (OANDA)
  "OANDA:US30_USD": "DOWJONES",   // Dow Jones (OANDA)
  "^NSEI": "NIFTY50",             // Nifty 50 (Finnhub)
  "^BSESN": "SENSEX",             // Sensex (Finnhub)
  "^IXIC": "NASDAQ",              // Nasdaq Composite (Finnhub)
};

const majorIndices = Object.values(indexSymbolMap);

export default function HomePage() {
  const quotes = useQuotesSocket(); // 🔌 live quotes map
  const [indicesHistory, setIndicesHistory] = useState<Record<string, IndexPoint[]>>({});

  // Derive trending stocks from quotes safely
  const trending: QuoteDto[] = useMemo(
    () => Object.values(quotes || {}),
    [quotes]
  );

  // Update indices history when quotes change (do NOT set state during render)
  useEffect(() => {
    if (!quotes) return;

    const now = new Date().toLocaleTimeString();

    setIndicesHistory((prev) => {
      let changed = false;
      const next: Record<string, IndexPoint[]> = { ...prev };

      for (const [raw, friendly] of Object.entries(indexSymbolMap)) {
        const q = quotes[raw];
        if (!q) continue;

        const history = next[friendly] || [];
        if (history.length === 0 || history[history.length - 1].price !== q.price) {
          next[friendly] = [...history, { timestamp: now, price: q.price }];
          changed = true;
        }
      }

      return changed ? next : prev;
    });
  }, [quotes]);

  // Build categories from the first index that has data
  const categories = useMemo(() => {
    const firstWithData = majorIndices.find((idx) => indicesHistory[idx]?.length);
    return firstWithData ? indicesHistory[firstWithData]!.map((d) => d.timestamp) : [];
  }, [indicesHistory]);

  return (
    <div className="homepage">
      <header className="hero">
        <h2>🌐 Market Discovery Platform</h2>
        <p>Real-time insights into global markets</p>
      </header>

      <SearchBar />

      {/* 📈 Ticker */}
      <div className="ticker">
        <span>
          {trending.map((stock) => (
            <span key={stock.symbol}>
              {stock.symbol} {stock.change >= 0 ? "▲" : "▼"} {stock.price} ({stock.change}%)
              &nbsp; | &nbsp;
            </span>
          ))}
        </span>
      </div>

      {/* 📊 Indices chart */}
      <section className="indices">
        <h2>Major Indices</h2>
       <Chart
  type="line"
  height={300}
  series={majorIndices.map((idx) => ({
    name: idx,
    data: (indicesHistory[idx] || []).map((d) => d.price),
  }))}
  options={{
    chart: {
      animations: { enabled: true },
      toolbar: { show: false },
      background: "transparent",
      foreColor: "#f0f8ff",
    },
    xaxis: {
      categories: categories.length ? categories : ["Waiting…"],
      labels: { style: { colors: "#f0f8ff" } },
      axisBorder: { color: "#00ffff" },
      axisTicks: { color: "#00ffff" },
    },
    yaxis: {
      labels: {
        formatter: (val) => (typeof val === "number" ? val.toFixed(2) : String(val)),
        style: { colors: "#f0f8ff" },
      },
    },
    stroke: { width: 2, curve: "smooth" },
    markers: { size: 4, colors: ["#00ffff"] },
    legend: {
      position: "bottom",
      labels: { colors: "#f0f8ff" },
    },
    grid: {
      borderColor: "#00ffff33",
      strokeDashArray: 4,
    },
    tooltip: {
      theme: "dark",
    },
    noData: {
      text: "Waiting for index quotes…",
      style: { color: "#ffffff" },
    },
  }}
/>

        {!categories.length && (
          <p style={{ marginTop: "0.5rem", opacity: 0.7 }}>
            Live data not received for indices yet. Confirm raw symbols like OANDA:SPX500_USD or ^NSEI are streaming.
          </p>
        )}
      </section>

      {/* 📋 Index cards */}
      <div className="index-cards">
        {Object.entries(indexSymbolMap).map(([raw, friendly]) => {
          const q = quotes?.[raw];
          return q ? (
            <div key={friendly} className="index-card">
              <h3>{friendly}</h3>
              <p><strong>Price:</strong> {q.price}</p>
              <p style={{ color: q.change >= 0 ? "green" : "red" }}>
                {q.change >= 0 ? "▲" : "▼"} {q.change}%
              </p>
            </div>
          ) : null;
        })}
      </div>

      {/* 📈 Trending stocks grid */}
      <section className="stocks">
        <h2>Trending Stocks</h2>
        <div className="stock-grid">
          {trending.map((stock, idx) => (
            <div key={idx} className="stock-card">
              <div className="stock-header">
                <h3>{stock.symbol}</h3>
              </div>
              <div className="stock-body">
                <p className="stock-price">₹{stock.price}</p>
                <p className={stock.change >= 0 ? "positive-change" : "negative-change"}>
                  {stock.change >= 0 ? "▲" : "▼"} {stock.change}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">© 2025 FinDash</footer>
    </div>
  );
}
