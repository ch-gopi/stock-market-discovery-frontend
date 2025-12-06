import { configureStore } from "@reduxjs/toolkit";
import quotesReducer from "./quotesSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    quotes: quotesReducer,
    user: userReducer,
  },
});

// Types for hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
