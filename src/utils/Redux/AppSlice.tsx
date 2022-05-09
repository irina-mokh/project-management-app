import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AppStateType {
  userToken: string | null;
}

export const initialState: AppStateType = {
  userToken: null,
};

export const appSlice = createSlice({
  name: "appReducer",
  initialState,
  reducers: {
    upDateToken: (state, action: PayloadAction<string>) => {
      state.userToken = action.payload;
    },
  },
});

export const { upDateToken } = appSlice.actions;

export default appSlice.reducer;
