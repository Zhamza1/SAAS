import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import rdvReducer from './slices/rdvSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    rdv: rdvReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
