import { createSlice } from '@reduxjs/toolkit';
import { Board } from 'types';
import { getBoards, createBoard } from './actions';

type IBoardsState = {
  isLoading: boolean;
  error: string | null;
  data: Array<Board>;
};

const initialState: IBoardsState = {
  isLoading: true,
  error: null,
  data: [],
};

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getBoards
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

      // createBoard
      .addCase(createBoard.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createBoard.fulfilled, (state, action) => {
        state.data = [...state.data, action.payload];
        state.isLoading = false;
      })
      .addCase(createBoard.rejected, (state, action) => {
        state.error = String(action.payload);
      });
  },
});

// export const {  } = authSlice.actions;

export default boardsSlice.reducer;
