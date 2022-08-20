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
