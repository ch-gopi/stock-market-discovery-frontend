import type{ WatchlistDTO } from "../types/WatchlistDTO";

interface Props {
  items: WatchlistDTO[];
}

export default function WatchlistTable({ items }: Props) {
  return (
    <table className="watchlist-table">
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Added At</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td>{item.symbol}</td>
            <td>{new Date(item.addedAt).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
