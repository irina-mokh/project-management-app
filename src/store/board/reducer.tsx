import { createSlice } from '@reduxjs/toolkit';
import { BoardDetails } from 'types';
import { createColumn, getBoard } from './actions';

type IBoardState = {
  isLoading: boolean;
  error: string | null;
  data: BoardDetails;
};

const initialState: IBoardState = {
  isLoading: true,
  error: null,
  data: {} as BoardDetails,
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
      })

      .addCase(createColumn.fulfilled, (state, action) => {
        state.data = {
          ...state.data,
          // добавляем к колонке tasks, т.к к ответе при создании приходит без этого массива
          columns: [...state.data.columns, { ...action.payload, tasks: [] }],
        };
      })
      .addCase(createColumn.rejected, (state, action) => {
        state.error = String(action.payload);
      });
  },
});

// export const {  } = boardSlice.actions;

export default boardSlice.reducer;
