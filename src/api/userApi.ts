import axios from 'axios';
export const userApi = { getWatchlist:()=>axios.get('/api/v1/watchlist') };
