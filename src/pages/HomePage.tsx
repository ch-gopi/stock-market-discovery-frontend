import { useState } from "react";
import Chart from "react-apexcharts";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import useQuotesSocket, { type QuoteDto } from "../hooks/useQuotesSocket";
import "../components/styles/HomePage.css";

interface IndexPoint {
  timestamp: string;
  price: number;
}

export default function HomePage() {
  const quotes = useQuotesSocket(); // 🔌 live quotes map
  const [indices, setIndices] = useState<IndexPoint[]>([]);

  // Derive trending stocks from quotes
  const trending: QuoteDto[] = Object.values(quotes);

  // Update indices chart whenever NIFTY50 updates
  if (quotes["NIFTY50"]) {
    const nifty = quotes["NIFTY50"];
    if (
      indices.length === 0 ||
      indices[indices.length - 1].price !== nifty.price
    ) {
      setIndices((prev) => [
        ...prev,
        { timestamp: new Date().toLocaleTimeString(), price: nifty.price },
      ]);
    }
  }

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
              {stock.symbol} {stock.change >= 0 ? "▲" : "▼"} {stock.price} (
              {stock.change}%)
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
                <p
                  className={
                    stock.change >= 0 ? "positive-change" : "negative-change"
                  }
                >
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

