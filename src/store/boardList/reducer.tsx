import { createSlice } from '@reduxjs/toolkit';
import { IBoard } from 'types';
import { getBoards, deleteBoard, createBoard } from './actions';

type IBoardsState = {
  isLoading: boolean;
  error: string | null;
  data: Array<IBoard>;
  hasModal: boolean;
  boardsOnClient: Array<IBoard>;
};

const initialState: IBoardsState = {
  isLoading: true,
  error: null,
  data: [],
  hasModal: false,
  boardsOnClient: [],
};

export const boardListSlice = createSlice({
  name: 'boardList',
  initialState,
  reducers: {
    showModal: (state, action) => {
      state.hasModal = action.payload;
    },
    searchBoards: (state, action) => {
      const search = action.payload.toLowerCase();

      const result = state.data.filter(
        (board) =>
          board.title.toLowerCase().includes(search) ||
          board.description.toLowerCase().includes(search)
      );
      state.boardsOnClient = result;
    },
    clearBoardsSearch: (state) => {
      state.boardsOnClient = state.data;
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
        state.boardsOnClient = action.payload;
        state.isLoading = false;
      })
      .addCase(getBoards.rejected, (state, action) => {
        state.error = String(action.payload);
        state.isLoading = false;
      })

      // deleteBoard
      .addCase(deleteBoard.fulfilled, (state, action) => {
        state.data = state.data.filter((board) => board.id !== action.payload);
        state.boardsOnClient = state.data;
      })
      .addCase(deleteBoard.rejected, (state, action) => {
        state.error = String(action.payload);
      })

      // createBoard
      .addCase(createBoard.fulfilled, (state, action) => {
        state.data = [...state.data, action.payload];
        state.boardsOnClient = state.data;
      })
      .addCase(createBoard.rejected, (state, action) => {
        state.error = String(action.payload);
      });
  },
});

export const { showModal, searchBoards, clearBoardsSearch } = boardListSlice.actions;

export default boardListSlice.reducer;
