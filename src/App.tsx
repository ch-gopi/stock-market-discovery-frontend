import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import NewHomePage from "./pages/NewHomePage";
import QuotesPage from "./pages/QuotesPage";
import HistoricalPage from "./pages/HistoricalPage";
import WatchlistPage from "./pages/WatchlistPage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./context/AuthContext";
import RegisterPage from "./pages/RegisterPage";
import MarketSearchPage from "./pages/MarketSearchPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/quotes" element={<QuotesPage />} />
              <Route path="/historical" element={<HistoricalPage />} />
              <Route path="/watchlist" element={<WatchlistPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
               <Route path="/home" element={<NewHomePage />} />
            <Route path="/search" element={<MarketSearchPage />} />

             
              
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
