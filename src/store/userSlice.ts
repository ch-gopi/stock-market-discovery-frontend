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
