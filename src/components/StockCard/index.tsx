// src/components/StockCard/index.tsx
type Props = {
  symbol: string;
  price: number;
  change: number;
};

export function StockCard({ symbol, price, change }: Props) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "8px", margin: "4px" }}>
      <h3>{symbol}</h3>
      <p>Price: {price}</p>
      <p style={{ color: change >= 0 ? "green" : "red" }}>
        Change: {change}%
      </p>
    </div>
  );
}
