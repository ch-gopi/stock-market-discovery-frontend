import axios from 'axios';
export const quotesApi = {
    getQuote: (s: string) => axios.get(`/api/v1/quotes/${s}`),
    subscribe: (symbols: string[]) => {
        return new WebSocket(`ws://localhost:8080/quotes-feed?symbols=${symbols.join(',')}`);
    }
};
