import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import StockDetailPage from "./pages/StockDetailPage";
import WatchlistPage from "./pages/WatchlistPage";
import ClientAssistPage from "./pages/ClientAssistPage";

export default function App() {
  return (
    <Router>
      <div>
        <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
          <Link to="/" style={{ marginRight: "10px" }}>Home</Link>
          <Link to="/stock" style={{ marginRight: "10px" }}>Stock Detail</Link>
          <Link to="/watchlist" style={{ marginRight: "10px" }}>Watchlist</Link>
          <Link to="/client" style={{ marginRight: "10px" }}>Client Assist</Link>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/stock" element={<StockDetailPage />} />
          <Route path="/watchlist" element={<WatchlistPage />} />
          <Route path="/client" element={<ClientAssistPage />} />
        </Routes>
      </div>
    </Router>
  );
}
