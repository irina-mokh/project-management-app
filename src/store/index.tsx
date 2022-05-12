import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import boardsReducer from './boards/boardsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    boards: boardsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
