import axios from "axios";

const BASE_URL = "http://localhost:8081";

const getAuthHeader = () => {
  const token = localStorage.getItem("jwt");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// ✅ Backend expects ?query=AAPL
const search = async (query: string) => {
  return axios.get(`${BASE_URL}/search`, {
    params: { query }, // <-- changed from q to query
    headers: getAuthHeader(),
  });
};

// 🔎 Search multiple symbols
const searchMultiple = async (symbols: string[]) => {
  const results = await Promise.all(
    symbols.map((sym) =>
      axios.get(`${BASE_URL}/search`, {
        params: { query: sym }, // <-- changed here too
        headers: getAuthHeader(),
      })
    )
  );
  return results.map((res) => res.data);
};

// 💡 Suggestions (if backend supports it)
const suggest = async (partial: string) => {
  return axios.get(`${BASE_URL}/search`, {
    params: { query: partial, type: "suggestions" }, // <-- changed here too
    headers: getAuthHeader(),
  });
};

const MarketSearchService = { search, searchMultiple, suggest };
export default MarketSearchService;
