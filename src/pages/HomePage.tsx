import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import Header from "../components/Header";

export default function HomePage() {
  const [indices, setIndices] = useState<any[]>([]);
  const [trending, setTrending] = useState<any[]>([]);

  useEffect(() => {
    setIndices([
      { timestamp: "10:00", price: 18500 },
      { timestamp: "10:05", price: 18520 },
      { timestamp: "10:10", price: 18510 },
      { timestamp: "10:15", price: 18530 },
    ]);
    setTrending([
      { symbol: "AAPL", price: 175, change: +1.2 },
      { symbol: "TSLA", price: 250, change: -0.8 },
      { symbol: "INFY", price: 1450, change: +0.5 },
    ]);
  }, []);

  return (
    <div className="homepage">

      <header className="hero">
        <h2>🌐 Market Discovery Platform</h2>
        <p>Real-time insights into global markets</p>
      </header>

      <div className="ticker">
        <span>
          AAPL ▲ 175.20 (+1.2%) &nbsp; | &nbsp; TSLA ▼ 250.10 (-0.8%) &nbsp; | &nbsp; INFY ▲ 1450 (+0.5%)
        </span>
      </div>

      <section className="indices">
        <h2>Major Indices</h2>
        <Chart
          type="line"
          series={[{ name: "NIFTY50", data: indices.map((d) => d.price) }]}
          options={{
            chart: { animations: { enabled: true } },
            xaxis: { categories: indices.map((d) => d.timestamp) },
          }}
        />
      </section>

      <section className="stocks">
        <h2>Trending Stocks</h2>
        <div className="stock-grid">
          {trending.map((stock, idx) => (
            <div key={idx} className="stock-card">
              <h3>{stock.symbol}</h3>
              <p>Price: ₹{stock.price}</p>
              <p className={stock.change >= 0 ? "positive-change" : "negative-change"}>
                {stock.change >= 0 ? "▲" : "▼"} {stock.change}%
              </p>
            </div>
          ))}
        </div>
      </section>

   

      <footer className="footer">
        © 2025 Market Discovery Platform | Powered by API Gateway
      </footer>
    </div>
  );
}
