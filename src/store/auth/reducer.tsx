import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { routes } from 'routes';
import { createUser, deleteUser, getUserPersData, signInUser } from './actions';

export type IAuthState = {
  userName: null | string;
  userId: null | string;
  login: null | string;
  error: null | string;
  isLoading: boolean;
  token: null | string;
  isConfirmOpen: boolean;
};
const initialState: IAuthState = {
  userName: null,
  userId: null,
  login: null,
  error: null,
  isLoading: false,
  token: null,
  isConfirmOpen: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    remError: (state) => {
      state.error = null;
    },
    setConfirmOpen: (state, action: PayloadAction<boolean>) => {
      state.isConfirmOpen = action.payload;
    },
    logOut: (state) => {
      state.login = null;
      state.token = null;
      state.userId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userId = action.payload.id;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.error = String(action.payload);
        state.isLoading = false;
      })
      .addCase(signInUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.login = action.payload.login;
        state.isLoading = false;
        window.location.href = `/${routes.main.path}`;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = String(action.payload);
      })
      .addCase(getUserPersData.fulfilled, (state, action) => {
        state.userId = action.payload.userId;
        state.userName = action.payload.userName;
        console.log('action1', action.payload);
      })
      .addCase(getUserPersData.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.userId = null;
        state.userName = null;
        state.token = null;
        state.login = null;
        window.location.href = `${routes.welcome.path}`;
        console.log('action2', action.payload);
      })
      .addCase(deleteUser.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { remError, setConfirmOpen, logOut } = authSlice.actions;

export default authSlice.reducer;
