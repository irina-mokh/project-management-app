import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppStateType {
  userToken: string | null;
  userLogin: string | null;
}

export const initialState: AppStateType = {
  userToken: null,
  userLogin: null,
};

export const appSlice = createSlice({
  name: 'appReducer',
  initialState,
  reducers: {
    upDateToken: (state, action: PayloadAction<string>) => {
      state.userToken = action.payload;
    },
    setUserLogin: (state, action: PayloadAction<string>) => {
      state.userLogin = action.payload;
    },
  },
});

export const { upDateToken } = appSlice.actions;
export const { setUserLogin } = appSlice.actions;

export default appSlice.reducer;
