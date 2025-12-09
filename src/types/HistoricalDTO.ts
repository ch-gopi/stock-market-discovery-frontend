export interface HistoricalDTO {
  timestamp?: number;
  date?: string;
  symbol: string;
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;
}
