const BASE_URL = "https://api.coingecko.com/api/v3";

// Fetch top 100 coins
export const fetchCryptos = async () => {
  const response = await fetch(
    `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch Cryptos");
  }

  return response.json();
};

// Fetch details for a single coin
export const fetchCoinData = async (id) => {
  const response = await fetch(
    `${BASE_URL}/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch coin data");
  }

  return response.json();
};

// Fetch 7-day chart data for a coin
export const fetchChartData = async (id) => {
  const response = await fetch(
    `${BASE_URL}/coins/${id}/market_chart?vs_currency=usd&days=7`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch chart data");
  }

  return response.json();
};
