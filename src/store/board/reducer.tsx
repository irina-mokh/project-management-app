import { createSlice } from '@reduxjs/toolkit';
import { BoardDetails } from 'types';
import { getBoard } from './actions';

interface IBoardState {
  isLoading: boolean;
  error: string | null;
  data: [BoardDetails] | null;
}
const initialState: IBoardState = {
  isLoading: true,
  error: null,
  data: null,
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBoard.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getBoard.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(getBoard.rejected, (state, action) => {
        state.error = String(action.payload);
      });
  },
});

// export const {  } = boardSlice.actions;

export default boardSlice.reducer;
