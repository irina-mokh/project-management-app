import { createSlice } from '@reduxjs/toolkit';
import { createUser, deleteUser, editUser, getUserPersData, signInUser } from './actions';

export type IAuthState = {
  userName: null | string;
  userId: null | string;
  userPassword: null | string;
  login: null | string;
  error: null | string;
  isLoading: boolean;
  token: null | string;
  editSuccess: boolean;
  deleteSuccess: boolean;
};

const initialState: IAuthState = {
  userName: null,
  userId: null,
  userPassword: null,
  login: null,
  error: null,
  isLoading: false,
  token: null,
  editSuccess: false,
  deleteSuccess: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    removeError: (state) => {
      state.error = null;
    },
    logOut: (state) => {
      state.login = null;
      state.token = null;
      state.userId = null;
      state.userName = null;
      state.userPassword = null;
    },
    removeSnackState: (state) => {
      state.editSuccess = false;
      state.deleteSuccess = false;
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
        state.userPassword = action.payload.password;
        state.error = null;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = String(action.payload);
      })

      .addCase(getUserPersData.fulfilled, (state, action) => {
        state.userId = action.payload.userId;
        state.userName = action.payload.userName;
        // console.log('action1', action.payload);
      })
      .addCase(getUserPersData.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(deleteUser.fulfilled, (state) => {
        state.userId = null;
        state.userName = null;
        state.token = null;
        state.login = null;
        state.deleteSuccess = true;
      })
      .addCase(deleteUser.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(editUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userName = action.payload.name;
        state.login = action.payload.login;
        state.editSuccess = true;
        console.log('actionEdit', action.payload);
      })
      .addCase(editUser.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { removeError, removeSnackState, logOut } = authSlice.actions;

export default authSlice.reducer;
