import { useHistory } from "../hooks/useHistory";
import type { HistoricalDTO } from "../types/HistoricalDTO";

export default function HistoricalPage() {
  const { history, loading, error } = useHistory("AAPL", "1mo");

  return (
    <div>
      <h2>Historical Data</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <table>
        <thead>
          <tr>
            <th>Date</th><th>Open</th><th>Close</th><th>Volume</th>
          </tr>
        </thead>
        <tbody>
          {history.map((h: HistoricalDTO) => (
            <tr key={h.date}>
              <td>{h.date}</td>
              <td>{h.open}</td>
              <td>{h.close}</td>
              <td>{h.volume}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
