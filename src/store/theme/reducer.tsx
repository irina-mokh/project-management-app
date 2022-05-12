import { createSlice } from '@reduxjs/toolkit';
import { PaletteMode } from '@mui/material';

type IModeState = {
  mode: PaletteMode;
};
const initialState: IModeState = {
  mode: (localStorage.getItem('mode') as PaletteMode) || 'light',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleMode: (state) => {
      if (state.mode === 'light') {
        state.mode = 'dark';
      } else {
        state.mode = 'light';
      }
      localStorage.setItem('mode', state.mode);
    },
  },
});

export const { toggleMode } = themeSlice.actions;

export default themeSlice.reducer;
