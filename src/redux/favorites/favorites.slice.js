import { createSlice } from '@reduxjs/toolkit';
import { LocalStorage } from '../../services/LocalStorage';

export const initialFavoritesState = { data: LocalStorage.get('favorites') || [] };

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: initialFavoritesState,
  reducers: {
    addToFavorites: (state, action) => {
      const updatedFavorites = [...state.data, action.payload];
      LocalStorage.set('favorites', updatedFavorites);
      state.data = updatedFavorites;
    },
    removeFromFavorites: (state, action) => {
      const updatedFavorites = state.data.filter((favorite) => favorite !== action.payload);
      LocalStorage.set('favorites', updatedFavorites);
      state.data = updatedFavorites;
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
