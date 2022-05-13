import { createSlice } from '@reduxjs/toolkit';
import { createUser, signInUser } from './actions';

export type IAuthState = {
  userId: null | string;
  login: string;
  error: null | string;
  isLoading: boolean;
  token: null | string;
};
const initialState: IAuthState = {
  userId: null,
  login: '',
  error: null,
  isLoading: false,
  token: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    removeError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      // axios sets token to LS
      .addCase(createUser.fulfilled, (state, action) => {
        state.userId = action.payload.id;
        state.isLoading = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.error = String(action.payload);
        state.isLoading = false;
      })
      .addCase(signInUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      // axios sets token to LS
      .addCase(signInUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.login = action.payload.login;
        state.isLoading = false;
        console.log('responseData', action.payload.token);
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = String(action.payload);
        console.log('errorData', String(action.payload));
      });
  },
});

export const removeError = authSlice.actions;

export default authSlice.reducer;
