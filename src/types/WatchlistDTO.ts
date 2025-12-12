export interface WatchlistDTO {
  id: string;
  symbol: string;
  addedAt: string;
}

export interface EnrichedWatchlistDTO extends WatchlistDTO {
  name: string;
  price: number;
  changePercent: number;
  sparkline: number[];
}
