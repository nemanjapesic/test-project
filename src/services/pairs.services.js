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

    const [
      SYMBOL,
      BID,
      BID_SIZE,
      ASK,
      ASK_SIZE,
      DAILY_CHANGE,
      DAILY_CHANGE_RELATIVE,
      LAST_PRICE,
      VOLUME,
      HIGH,
      LOW,
    ] = response.data[0];

    const pairDetails = {
      SYMBOL,
      LAST_PRICE,
      HIGH,
      LOW,
    };

    return pairDetails;
  } catch (error) {
    console.log(error);
  }
};
