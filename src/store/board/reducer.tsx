import { createSlice, current } from '@reduxjs/toolkit';
import { IBoardDetails, IColumn, ITask } from 'types';
import { getBoard, createColumn, deleteColumn, deleteTask } from './actions';

interface ITaskWithColID extends ITask {
  columnId: string;
}
type IBoardState = {
  isLoading: boolean;
  error: string | null;
  data: IBoardDetails;
  searchResults: Array<ITaskWithColID>;
  isSearchFocus: boolean;
};

const initialState: IBoardState = {
  isLoading: true,
  error: null,
  data: {} as IBoardDetails,
  searchResults: [],
  isSearchFocus: false,
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    searchTasks: (state, action) => {
      const search = action.payload.toLowerCase();
      const columns = current(state.data.columns);

      const allTasks = columns
        .map((col: IColumn) => {
          const tasksWithColId = col.tasks.map((task) => ({ ...task, columnId: col.id }));
          return tasksWithColId;
        })
        .flat();

      const result = allTasks.filter(
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
    moveColumn: (state, action) => {
      const { dragIndex, hoverIndex } = action.payload;
      if (state.data) {
        const columns = state.data.columns;
        const dragColumn = columns[dragIndex - 1];
        columns.splice(dragIndex - 1, 1);
        columns.splice(hoverIndex - 1, 0, dragColumn);

        columns.forEach(async (column, i) => {
          // set state column order
          column.order = i + 1;
        });
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
        const sortedColumns = action.payload.columns.sort(
          (a: IColumn, b: IColumn) => a.order - b.order
        );

        state.data = action.payload;
        if (state.data?.columns) {
          state.data.columns = sortedColumns;
        }
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
      })

      // deleteColumn
      .addCase(deleteColumn.fulfilled, (state, action) => {
        state.data.columns = state.data.columns.filter((column) => column.id !== action.payload);
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

export const { moveColumn, clearTasksSearch, searchTasks, toggleSearchFocus } = boardSlice.actions;

export default boardSlice.reducer;
