import api from './api';

export const getPairs = async (limit) => {
  try {
    const response = await api.get('v1/symbols');
    const topPairs = response.data.slice(0, limit);

    return topPairs;
  } catch (error) {
    console.log(error);
  }
};

export const getPairDetails = async (symbolId) => {
  try {
    const response = await api.get(`v2/tickers/?symbols=t${symbolId}`);

    const [symbol, , , , , , , lastPrice, , high, low] = response.data[0];

    const pairDetails = {
      symbol,
      lastPrice,
      high,
      low,
    };

    return pairDetails;
  } catch (error) {
    console.log(error);
  }
};
