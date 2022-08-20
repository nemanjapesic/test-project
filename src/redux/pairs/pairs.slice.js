import { createSlice } from '@reduxjs/toolkit';

export const initialPairsState = { data: [] };

const pairsSlice = createSlice({
  name: 'pairs',
  initialState: initialPairsState,
  reducers: {
    update: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { update } = pairsSlice.actions;

export default pairsSlice.reducer;
