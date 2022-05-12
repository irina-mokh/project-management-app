import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { Board } from 'types';
import { axios } from 'utils/axios';

type IBoardsState = {
  isLoading: boolean;
  error: string | null;
  data: [Board] | null;
};
const initialState: IBoardsState = {
  isLoading: true,
  error: null,
  data: null,
};

export const getBoards = createAsyncThunk(
  'boards/getBoards',
  async function (arg, { rejectWithValue }) {
    try {
      const response = await axios.get('boards');
      if (response.statusText !== 'OK') {
        throw new Error('Error');
      }
      console.log(response.data);
      return response.data;
    } catch (err) {
      return rejectWithValue((err as AxiosError).message);
    }
  }
);

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBoards.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getBoards.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(getBoards.rejected, (state, action) => {
        state.error = String(action.payload);
      });
  },
});

// export const {  } = authSlice.actions;

export default boardsSlice.reducer;
