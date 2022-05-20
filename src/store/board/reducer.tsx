import { createSlice } from '@reduxjs/toolkit';
import { IBoardDetails, IColumn } from 'types';
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
  reducers: {
    moveColumn: (state, action) => {
      const { dragIndex, hoverIndex } = action.payload;
      console.log(dragIndex, hoverIndex);
      if (state.data?.columns) {
        const columns = state.data.columns;
        const dragColumn = columns[dragIndex];
        columns.splice(dragIndex, 1);
        columns.splice(hoverIndex, 0, dragColumn);
        // update columns order
        for (let i = 0; i < columns.length; i += 1) {
          columns[i].order = i;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // getBoard
      .addCase(getBoard.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getBoard.fulfilled, (state, action) => {
        const sortedColumns = action.payload.columns.sort((a: IColumn, b: IColumn) => {
          if (a.order > b.order) {
            return 1;
          }
          if (a.order < b.order) {
            return -1;
          }
        });
        state.data = action.payload;
        if (state.data?.columns) {
          state.data.columns = sortedColumns;
        }
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
        state.isLoading = false;
      });
  },
});

export const { moveColumn } = boardSlice.actions;

export default boardSlice.reducer;
