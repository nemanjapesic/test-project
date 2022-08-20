import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/auth.slice';
import pairsReducer from './pairs/pairs.slice';

export default configureStore({
  reducer: {
    auth: authReducer,
    pairs: pairsReducer,
  },
});
