import { createSlice } from '@reduxjs/toolkit';
import { IBoardDetails } from 'types';
import { getBoard, updateColumn, deleteColumn } from './actions';

type IBoardState = {
  isLoading: boolean;
  error: string | null;
  data: IBoardDetails | null;
};
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
      // getBoard
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
      })

      // updateColumn {
      .addCase(updateColumn.fulfilled, () => {
        // state.data = action.payload;
      })
      .addCase(updateColumn.rejected, (state, action) => {
        state.error = String(action.payload);
      })

      // deleteColumn
      .addCase(deleteColumn.fulfilled, (state, action) => {
        if (state.data?.columns) {
          state.data.columns = state.data?.columns.filter((column) => column.id !== action.payload);
        }
      })
      .addCase(deleteColumn.rejected, (state, action) => {
        state.error = String(action.payload);
      });
  },
});

// export const {  } = boardSlice.actions;

export default boardSlice.reducer;
