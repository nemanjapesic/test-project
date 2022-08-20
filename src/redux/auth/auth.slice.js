import { createSlice } from '@reduxjs/toolkit';
import { LocalStorage } from '../../services/LocalStorage';

export const initialAuthState = {
  isAuthenticated: LocalStorage.get('isAuthenticated') || false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    login: (state) => {
      LocalStorage.set('isAuthenticated', true);
      state.isAuthenticated = true;
    },
  },
});

export const { login } = authSlice.actions;

export default authSlice.reducer;
