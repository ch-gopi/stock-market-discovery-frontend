import { useState, useEffect } from "react";
import type { HistoricalDTO } from "../types/HistoricalDTO";
import { HistoricalService } from "../api/HistoricalService";
import Chart from "react-apexcharts"; // 📊 chart library
import type { ApexOptions } from "apexcharts";
import "../components/styles/hindex.css";

// Represents the data from the HistoricalService
interface HistoricalServiceData {
  symbol: string;
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;
  timestamp: number;
}

export default function HistoricalPage() {
  const [symbol, setSymbol] = useState("AAPL");   // default symbol
  const [period, setPeriod] = useState("1mo");    // default period
  const [history, setHistory] = useState<HistoricalDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ Dummy dataset
  const dummyHistory: Record<string, HistoricalDTO[]> = {
    AAPL: [
      { date: "2025-11-01", symbol: "AAPL", open: 172.5, close: 174.2, high: 175.3, low: 172.1, volume: 89000000 },
      { date: "2025-11-02", symbol: "AAPL", open: 174.2, close: 175.0, high: 175.8, low: 173.9, volume: 76000000 },
      { date: "2025-11-03", symbol: "AAPL", open: 175.0, close: 173.8, high: 175.5, low: 173.5, volume: 82000000 },
      { date: "2025-11-04", symbol: "AAPL", open: 173.8, close: 176.1, high: 176.5, low: 173.6, volume: 91000000 },
      { date: "2025-11-05", symbol: "AAPL", open: 176.1, close: 175.2, high: 176.8, low: 175.0, volume: 87000000 },
    ],
    TSLA: [
      { date: "2025-11-01", symbol: "TSLA", open: 248.0, close: 250.1, high: 251.2, low: 247.5, volume: 65000000 },
      { date: "2025-11-02", symbol: "TSLA", open: 250.1, close: 252.5, high: 253.0, low: 249.8, volume: 70000000 },
      { date: "2025-11-03", symbol: "TSLA", open: 252.5, close: 249.0, high: 253.2, low: 248.5, volume: 68000000 },
      { date: "2025-11-04", symbol: "TSLA", open: 249.0, close: 251.2, high: 252.1, low: 248.8, volume: 72000000 },
      { date: "2025-11-05", symbol: "TSLA", open: 251.2, close: 250.0, high: 251.8, low: 249.5, volume: 69000000 },
    ],
    INFY: [
      { date: "2025-11-01", symbol: "INFY", open: 1445, close: 1450, high: 1452, low: 1443, volume: 12000000 },
      { date: "2025-11-02", symbol: "INFY", open: 1450, close: 1455, high: 1458, low: 1449, volume: 11000000 },
      { date: "2025-11-03", symbol: "INFY", open: 1455, close: 1448, high: 1456, low: 1447, volume: 12500000 },
      { date: "2025-11-04", symbol: "INFY", open: 1448, close: 1460, high: 1462, low: 1447, volume: 13000000 },
      { date: "2025-11-05", symbol: "INFY", open: 1460, close: 1452, high: 1462, low: 1450, volume: 11800000 },
    ],
  };

  // ✅ Fetch from backend or fallback to dummy
function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    timeZone: "Asia/Kolkata",
  });
}

async function fetchHistory() {
  setLoading(true);
  setError(null);
  try {
    const data = await HistoricalService.getHistory(symbol, period);
    const enriched: HistoricalDTO[] = data.map((d: HistoricalServiceData) => ({
      ...d,
      date: formatDate(d.timestamp), // ✅ inject readable date
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
    stroke: { curve: "smooth" as const },
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
          <option value="1mo">1 Month</option>
          <option value="3mo">3 Months</option>
          <option value="6mo">6 Months</option>
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
                <th>Volume</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h: HistoricalDTO) => (
                <tr key={h.date}>
                  <td>{h.date || new Date(h.timestamp!).toLocaleDateString("en-IN")}</td>
                  <td>{h.open}</td>
                  <td>{h.close}</td>
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
