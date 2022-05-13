import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/reducer';
import boardListReducer from './boardList/reducer';
import themeReducer from './theme/reducer';
import boardReducer from './board/reducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    boardList: boardListReducer,
    theme: themeReducer,
    board: boardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
