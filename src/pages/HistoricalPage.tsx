import { useState, useEffect } from "react";
import type { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts"; // 📊 chart library
import { HistoricalService } from "../api/HistoricalService";
import type { HistoricalDTO } from "../types/HistoricalDTO";
import "../components/styles/hindex.css";

// Represents the raw data from backend
interface HistoricalServiceData {
  symbol: string;
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;
  timestamp: number;
}

// Utility: format timestamp into readable date
function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    timeZone: "Asia/Kolkata",
  });
}

export default function HistoricalPage() {
  const [symbol, setSymbol] = useState("AAPL");   // default symbol
  const [period, setPeriod] = useState("1m");    // default period
  const [history, setHistory] = useState<HistoricalDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Dummy fallback dataset
  const dummyHistory: Record<string, HistoricalDTO[]> = {
    AAPL: [
      { date: "2025-11-01", symbol: "AAPL", open: 172.5, close: 174.2, high: 175.3, low: 172.1, volume: 89000000 },
      { date: "2025-11-02", symbol: "AAPL", open: 174.2, close: 175.0, high: 175.8, low: 173.9, volume: 76000000 },
      { date: "2025-11-03", symbol: "AAPL", open: 175.0, close: 173.8, high: 175.5, low: 173.5, volume: 82000000 },
      { date: "2025-11-04", symbol: "AAPL", open: 173.8, close: 176.1, high: 176.5, low: 173.6, volume: 91000000 },
      { date: "2025-11-05", symbol: "AAPL", open: 176.1, close: 175.2, high: 176.8, low: 175.0, volume: 87000000 },
    ],
  };

  // Fetch history from backend
  async function fetchHistory() {
    setLoading(true);
    setError(null);
    try {
      const data = await HistoricalService.getHistory(symbol, period);
      const enriched: HistoricalDTO[] = data.map((d: HistoricalServiceData) => ({
        ...d,
        date: formatDate(d.timestamp), // inject readable date
      }));
      setHistory(enriched);
    } catch (err) {
      console.warn("Backend unavailable, using dummy data:", err);
      setHistory(dummyHistory[symbol] || dummyHistory["AAPL"]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchHistory();
  }, [symbol, period]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    fetchHistory();
  }

  // 📊 Chart config
  const chartOptions: ApexOptions = {
    chart: { id: "historical-chart", animations: { enabled: true } },
    xaxis: { categories: history.map(h => h.date) },
    stroke: { curve: "smooth" },
    colors: ["#00d4ff"],
  };

  const chartSeries = [
    { name: `${symbol} Close`, data: history.map(h => h.close) }
  ];

  return (
    <div className="historical-page">
      <h2>Historical Data</h2>

      {/* 🔍 Search bar */}
      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          placeholder="Enter stock symbol (e.g. AAPL, TSLA, INFY)"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
        />
        <label htmlFor="period-select">Period:</label>
        <select
          id="period-select"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        >
          <option value="1m">1 Month</option>
          <option value="3m">3 Months</option>
          <option value="6m">6 Months</option>
          <option value="1y">1 Year</option>
          <option value="5y">5 Years</option>
        </select>
        <button type="submit">Search</button>
      </form>

      {/* 📊 Render results */}
      {loading && <p>Loading...</p>}
      {error && <p className="error">Error: {error}</p>}

      {history.length > 0 && (
        <>
          {/* Line chart */}
          <Chart options={chartOptions} series={chartSeries} type="line" height={300} />

          {/* Table */}
          <table className="history-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Open</th>
                <th>Close</th>
                <th>High</th>
                <th>Low</th>
                <th>Volume</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h: HistoricalDTO, idx) => (
                <tr key={`${h.symbol}-${idx}`}>
                  <td>{h.date || new Date(h.timestamp!).toLocaleDateString("en-IN")}</td>
                  <td>{h.open}</td>
                  <td>{h.close}</td>
                  <td>{h.high}</td>
                  <td>{h.low}</td>
                  <td>{h.volume.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
