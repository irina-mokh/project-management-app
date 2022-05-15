import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/reducer';
import boardsReducer from './boards/reducer';
import themeReducer from './theme/reducer';

const persistedState = () => {
  let state;
  const value = localStorage.getItem('reduxState');
  if (typeof value === 'string') {
    state = JSON.parse(value);
  } else {
    state = {};
  }
  return state;
};

export const store = configureStore({
  preloadedState: persistedState(),
  reducer: {
    auth: authReducer,
    boards: boardsReducer,
    theme: themeReducer,
  },
});

store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
