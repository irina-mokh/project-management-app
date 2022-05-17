import { createSlice } from '@reduxjs/toolkit';
import { IBoard } from 'types';
import { getBoards, deleteBoard, createBoard } from './actions';

type IBoardsState = {
  isLoading: boolean;
  error: string | null;
  data: Array<IBoard>;
  hasModal: boolean;
};

const initialState: IBoardsState = {
  isLoading: true,
  error: null,
  data: [],
  hasModal: false,
};

export const boardListSlice = createSlice({
  name: 'boardList',
  initialState,
  reducers: {
    // возвращаем state и меняем только hasModal
    toggleModal: function (state) {
      console.log('Current state: ');
      console.log(state);
      return {
        ...state,
        hasModal: !state.hasModal,
      };
    },
  },
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
        state.isLoading = false;
      })

      // deleteBoard
      .addCase(deleteBoard.fulfilled, (state, action) => {
        if (state.data?.length) {
          state.data = state.data?.filter((board) => board.id !== action.payload);
        }
      })
      .addCase(deleteBoard.rejected, (state, action) => {
        state.error = String(action.payload);
      })

      // createBoard
      .addCase(createBoard.fulfilled, (state, action) => {
        state.data = [...state.data, action.payload];
      })
      .addCase(createBoard.rejected, (state, action) => {
        state.error = String(action.payload);
      });
  },
});

export const { toggleModal } = boardListSlice.actions;

export default boardListSlice.reducer;
