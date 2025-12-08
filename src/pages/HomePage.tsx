import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar"; // 🔍 new reusable search bar
import "../components/styles/HomePage.css";

interface IndexPoint {
  timestamp: string;
  price: number;
}

interface Stock {
  symbol: string;
  price: number;
  change: number;
}

export default function HomePage() {
  const [indices, setIndices] = useState<IndexPoint[]>([]);
  const [trending, setTrending] = useState<Stock[]>([]);

  useEffect(() => {
    // ✅ Dummy data for indices (NIFTY50 over time)
    setIndices([
      { timestamp: "09:00", price: 18500 },
      { timestamp: "09:30", price: 18520 },
      { timestamp: "10:00", price: 18510 },
      { timestamp: "10:30", price: 18540 },
      { timestamp: "11:00", price: 18560 },
      { timestamp: "11:30", price: 18530 },
      { timestamp: "12:00", price: 18580 },
      { timestamp: "12:30", price: 18600 },
      { timestamp: "13:00", price: 18590 },
      { timestamp: "13:30", price: 18620 },
    ]);

    // ✅ Dummy data for trending stocks
    setTrending([
      { symbol: "AAPL", price: 175.2, change: +1.2 },
      { symbol: "TSLA", price: 250.1, change: -0.8 },
      { symbol: "INFY", price: 1450, change: +0.5 },
      { symbol: "MSFT", price: 320, change: +2.1 },
      { symbol: "GOOGL", price: 135, change: -0.4 },
      { symbol: "AMZN", price: 145, change: +1.0 },
      { symbol: "NVDA", price: 480, change: +3.5 },
      { symbol: "META", price: 325, change: -1.0 },
      { symbol: "NFLX", price: 410, change: +2.4 },
      { symbol: "IBM", price: 162, change: +0.3 },
      { symbol: "ORCL", price: 118, change: +0.9 },
      { symbol: "TCS", price: 3600, change: +1.8 },
      { symbol: "WIPRO", price: 420, change: -0.6 },
    ]);
  }, []);

  return (
    <div className="homepage">
      <header className="hero">
        <h2>🌐 Market Discovery Platform</h2>
        <p>Real-time insights into global markets</p>
      </header>

      {/* 🔍 Search bar */}
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
          height={250}
          series={[{ name: "NIFTY50", data: indices.map((d) => d.price) }]}
          options={{
            chart: { animations: { enabled: true } },
            xaxis: { categories: indices.map((d) => d.timestamp) },
          }}
        />
      </section>

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
