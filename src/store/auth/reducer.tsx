import { createSlice } from '@reduxjs/toolkit';
import { createUser } from './actions';

type IAuthState = {
  login: string;
  error: null | string;
  isLoading: boolean;
  token: null | string;
};
const initialState: IAuthState = {
  login: '',
  error: null,
  isLoading: true,
  token: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      // axios sets token to LS
      .addCase(createUser.fulfilled, (state, action) => {
        state.token = action.payload.data.token;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.error = String(action.payload);
      });
  },
});

export default authSlice.reducer;
