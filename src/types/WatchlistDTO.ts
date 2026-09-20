// Matches backend WatchlistItemDto returned by
// POST /watchlist, GET /watchlist/{userId}
export interface WatchlistDTO {
  symbol: string;
  lastPrice: number;
  change: number;
  changePercent: number;
  sparkline: number[];
}

export type EnrichedWatchlistDTO = WatchlistDTO;
