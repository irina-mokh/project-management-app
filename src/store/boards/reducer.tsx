import { createSlice } from '@reduxjs/toolkit';
import { Board } from 'types';
import { getBoards, deleteBoard } from './actions';

type IBoardsState = {
  isLoading: boolean;
  error: string | null;
  data: Board[] | null;
};
const initialState: IBoardsState = {
  isLoading: true,
  error: null,
  data: null,
};

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
      })

      .addCase(deleteBoard.fulfilled, (state, action) => {
        if (state.data?.length) {
          state.data = state.data?.filter((board) => board.id !== action.payload);
        }
      })
      .addCase(deleteBoard.rejected, (state, action) => {
        state.error = String(action.payload);
      });
  },
});

// export const { } = boardsSlice.actions;

export default boardsSlice.reducer;
