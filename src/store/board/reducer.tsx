import { createSlice, current } from '@reduxjs/toolkit';
import { IBoardDetails, IColumn, ITask } from 'types';
import { getBoard, updateColumn, deleteColumn, deleteTask } from './actions';

type IBoardState = {
  isLoading: boolean;
  error: string | null;
  data: IBoardDetails | null;
  searchResults: Array<ITask>;
  isSearchFocus: boolean;
};
const initialState: IBoardState = {
  isLoading: true,
  error: null,
  data: null,
  searchResults: [],
  isSearchFocus: false,
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    searchTasks: (state, action) => {
      const search = action.payload.toLowerCase();
      const columns = current(state.data?.columns);

      const allTasks: ITask[] = columns ? columns.map((col: IColumn) => col.tasks).flat() : [];

      const result: ITask[] = allTasks.filter(
        (task) =>
          task.title.toLowerCase().includes(search) ||
          task.description.toLowerCase().includes(search)
      );
      state.searchResults = result;
    },
    clearTasksSearch: (state) => {
      state.searchResults = [];
    },
    toggleSearchFocus: (state, action) => {
      state.isSearchFocus = action.payload;
      state.searchResults = [];
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
      })

      // deleteTask
      .addCase(deleteTask.fulfilled, (state, action) => {
        const column = state.data?.columns.find((column) => column.id === action.payload.columnId);
        if (column) {
          const tasks = column.tasks.filter((task) => task.id !== action.payload.taskId);
          column.tasks = tasks;
        }
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.error = String(action.payload);
        state.isLoading = false;
      });
  },
});

export const { clearTasksSearch, searchTasks, toggleSearchFocus } = boardSlice.actions;

export default boardSlice.reducer;
