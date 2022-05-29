import { createSlice } from '@reduxjs/toolkit';

export type LangStateType = {
  lang: null | string;
};
const initialState: LangStateType = {
  lang: localStorage.getItem('i18nextLng'),
};

export const langSlice = createSlice({
  name: 'langSwitcher',
  initialState,
  reducers: {
    toggleLang: (state) => {
      if (state.lang === 'en') {
        state.lang = 'ru';
      } else {
        state.lang = 'en';
      }
    },
  },
});

export const { toggleLang } = langSlice.actions;

export default langSlice.reducer;
