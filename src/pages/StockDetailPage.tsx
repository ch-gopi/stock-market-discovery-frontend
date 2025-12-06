// src/pages/StockDetailPage.tsx
import { Chart } from "../components/Chart";

export default function StockDetailPage() {
  return (
    <div>
      <h2>Stock Detail</h2>
      <Chart symbol="AAPL" />
    </div>
  );
}
