#!/bin/bash
# add-structure.sh
# Run this inside your existing Vite React+TS project root

set -e

# Create folders
mkdir -p src/api
mkdir -p src/components/SearchBar
mkdir -p src/components/StockCard
mkdir -p src/components/QuoteTicker
mkdir -p src/components/Chart
mkdir -p src/components/FiltersPanel
mkdir -p src/pages
mkdir -p src/store
mkdir -p src/hooks
mkdir -p src/utils

# API clients
echo "import axios from 'axios';" > src/api/quotesApi.ts
echo "export const quotesApi = { getQuote:(s:string)=>axios.get(\`/api/v1/quotes/\${s}\`) };" >> src/api/quotesApi.ts

echo "import axios from 'axios';" > src/api/marketApi.ts
echo "export const marketApi = { search:(q:string)=>axios.get(\`/api/v1/market/search?q=\${q}\`) };" >> src/api/marketApi.ts

echo "import axios from 'axios';" > src/api/userApi.ts
echo "export const userApi = { getWatchlist:()=>axios.get('/api/v1/watchlist') };" >> src/api/userApi.ts

# Components
echo "export function SearchBar(){ return <div>SearchBar</div>; }" > src/components/SearchBar/index.tsx
echo "export function StockCard(){ return <div>StockCard</div>; }" > src/components/StockCard/index.tsx
echo "export function QuoteTicker(){ return <div>QuoteTicker</div>; }" > src/components/QuoteTicker/index.tsx
echo "export function Chart(){ return <div>Chart</div>; }" > src/components/Chart/index.tsx
echo "export function FiltersPanel(){ return <div>FiltersPanel</div>; }" > src/components/FiltersPanel/index.tsx

# Pages
echo "export default function HomePage(){ return <div>Home Page</div>; }" > src/pages/HomePage.tsx
echo "export default function StockDetailPage(){ return <div>Stock Detail Page</div>; }" > src/pages/StockDetailPage.tsx
echo "export default function WatchlistPage(){ return <div>Watchlist Page</div>; }" > src/pages/WatchlistPage.tsx
echo "export default function ClientAssistPage(){ return <div>Client Assist Page</div>; }" > src/pages/ClientAssistPage.tsx

# Store slices
cat > src/store/quotesSlice.ts <<EOF
import { createSlice } from '@reduxjs/toolkit';
const quotesSlice = createSlice({
  name: 'quotes',
  initialState: { data: {} },
  reducers: {
    setQuote(state, action) {
      state.data[action.payload.symbol] = action.payload;
    }
  }
});
export const { setQuote } = quotesSlice.actions;
export default quotesSlice.reducer;
EOF

cat > src/store/userSlice.ts <<EOF
import { createSlice } from '@reduxjs/toolkit';
const userSlice = createSlice({
  name: 'user',
  initialState: { watchlist: [] },
  reducers: {
    setWatchlist(state, action) {
      state.watchlist = action.payload;
    }
  }
});
export const { setWatchlist } = userSlice.actions;
export default userSlice.reducer;
EOF

# Hooks
cat > src/hooks/useWebSocket.ts <<EOF
import { useEffect } from 'react';
export function useWebSocket(url: string, onMsg: (msg:any)=>void) {
  useEffect(()=>{
    const socket = new WebSocket(url);
    socket.onmessage = e => onMsg(JSON.parse(e.data));
    return ()=> socket.close();
  },[url]);
}
EOF

cat > src/hooks/useDebounce.ts <<EOF
import { useState, useEffect } from 'react';
export function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(()=>{
    const handler = setTimeout(()=>setDebounced(value), delay);
    return ()=>clearTimeout(handler);
  },[value, delay]);
  return debounced;
}
EOF

# Utils
echo "export function formatPrice(p:number){ return p.toFixed(2); }" > src/utils/format.ts

echo "✅ Project structure created successfully."
