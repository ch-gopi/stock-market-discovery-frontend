// src/store/quotesSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Quote {
  symbol: string;
  price?: number;
  change?: number;
}

interface QuotesState {
  data: Record<string, Quote>;
  searchResults: Quote[];
}

const initialState: QuotesState = {
  data: {},
  searchResults: [],
};

const quotesSlice = createSlice({
  name: "quotes",
  initialState,
  reducers: {
    setQuote(state, action: PayloadAction<Quote>) {
      state.data[action.payload.symbol] = action.payload;
    },
    setSearchResults(state, action: PayloadAction<Quote[]>) {
      state.searchResults = action.payload;
    },
  },
});

export const { setQuote, setSearchResults } = quotesSlice.actions;
export default quotesSlice.reducer;
