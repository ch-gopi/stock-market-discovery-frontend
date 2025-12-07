// src/pages/HomePage.tsx
import { SearchBar } from "../components/SearchBar";
import { QuoteTicker } from "../components/QuoteTicker";
import { StockCard } from "../components/StockCard";
import { useAppSelector } from "../hooks/reduxHooks";
import { Box, Typography, Container, Paper } from "@mui/material";
import Grid from "@mui/material/Grid";


export default function HomePage() {
  const results = useAppSelector((state) => state.quotes.searchResults);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f7fa" }}>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
          color: "white",
          py: 8,
          textAlign: "center",
        }}
      >
        <Typography variant="h2" fontWeight="bold" gutterBottom>
          📈 Market Discovery
        </Typography>
        <Typography variant="h6" sx={{ maxWidth: 600, mx: "auto", mb: 4 }}>
          Explore live quotes, track your favorite stocks, and stay ahead with real‑time insights.
        </Typography>
        <Box sx={{ maxWidth: 500, mx: "auto" }}>
          <SearchBar />
        </Box>
      </Box>

      {/* Quote Ticker Strip */}
      <Paper
        elevation={3}
        sx={{
          bgcolor: "#1e293b",
          color: "white",
          py: 1,
          px: 2,
          overflowX: "auto",
          whiteSpace: "nowrap",
        }}
      >
        <QuoteTicker />
      </Paper>

      {/* Results Section */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          🔍 Search Results
        </Typography>
        {results.length === 0 ? (
          <Typography variant="body1" color="text.secondary">
            No stocks found. Try searching for a symbol like <b>AAPL</b> or <b>TSLA</b>.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {results.map((r) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={r.symbol}>
                <StockCard
                  symbol={r.symbol}
                  price={r.price || 0}
                  change={r.change || 0}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
