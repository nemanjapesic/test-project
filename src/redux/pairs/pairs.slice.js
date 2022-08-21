import { createSlice } from '@reduxjs/toolkit';

export const initialPairsState = { data: [] };

const pairsSlice = createSlice({
  name: 'pairs',
  initialState: initialPairsState,
  reducers: {
    updatePairsFeed: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { updatePairsFeed } = pairsSlice.actions;

export default pairsSlice.reducer;
