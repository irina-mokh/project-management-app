import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { NewUserType } from 'types';
import { axios } from '../../utils/axios';

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

export const createUser = createAsyncThunk(
  'auth/createUser',
  async function (user: NewUserType, { rejectWithValue }) {
    const url = `signup`;
    try {
      const response = await axios.post(url, user);
      if (response.statusText !== 'OK') {
        throw new Error('Error');
      }
      return response.data;
    } catch (err) {
      return rejectWithValue((err as AxiosError).message);
    }
  }
);

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

// export const {  } = authSlice.actions;

export default authSlice.reducer;
