import axios from 'axios';
export const marketApi = { search:(q:string)=>axios.get(`/api/v1/market/search?q=${q}`) };
