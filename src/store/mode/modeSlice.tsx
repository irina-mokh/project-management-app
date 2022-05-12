import { createSlice } from '@reduxjs/toolkit';
import { PaletteMode } from '@mui/material';

type IModeState = {
  mode: PaletteMode;
};
const initialState: IModeState = {
  mode: (localStorage.getItem('mode') as PaletteMode) || 'light',
};

export const modeSlice = createSlice({
  name: 'mode',
  initialState,
  reducers: {
    toggleMode: (state) => {
      console.log('toggleMode');
      if (state.mode === 'light') {
        state.mode = 'dark';
      } else {
        state.mode = 'light';
      }
      localStorage.setItem('mode', state.mode);
    },
  },
});

export const { toggleMode } = modeSlice.actions;

export default modeSlice.reducer;
