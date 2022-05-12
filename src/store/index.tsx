import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/reducer';
import boardsReducer from './boards/reducer';
import themeReducer from './theme/reducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    boards: boardsReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
