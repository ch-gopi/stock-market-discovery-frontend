import axios from "axios";

const BASE_URL = "http://localhost:8081";

const search = async (query: string) => {
  const token = localStorage.getItem("jwt");
  return axios.get(`${BASE_URL}/search`, {
    params: { query }, // backend expects ?query=AAPL
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
};

const MarketSearchService = { search };
export default MarketSearchService;
