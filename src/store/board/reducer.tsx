import { createSlice } from '@reduxjs/toolkit';
import { IBoardDetails, IColumn } from 'types';
import { getBoard, createColumn, deleteColumn, deleteTask } from './actions';

type IBoardState = {
  isLoading: boolean;
  error: string | null;
  data: IBoardDetails;
  isPending: boolean;
};

const initialState: IBoardState = {
  isLoading: true,
  error: null,
  data: {} as IBoardDetails,
  isPending: false,
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    moveColumn: (state, action) => {
      const { dragIndex, hoverIndex } = action.payload;
      const columns = state.data.columns;
      const dragColumn = columns[dragIndex - 1];
      columns.splice(dragIndex - 1, 1);
      columns.splice(hoverIndex - 1, 0, dragColumn);
      columns.forEach(async (column, i) => {
        // set state column order
        column.order = i + 1;
      });
    },
    moveTask: (state, action) => {
      // console.log(action.payload);
      const { dragIndex, hoverIndex, dragColumnIndex, dropColumnIndex } = action.payload;
      const columns = state.data.columns;

      const dragColumn = columns[dragColumnIndex - 1].tasks;
      const dropColumn = columns[dropColumnIndex - 1].tasks;
      const dragTask = dragColumn[dragIndex - 1];
      dragColumn.splice(dragIndex - 1, 1);

      if (dragColumnIndex == dropColumnIndex) {
        dragColumn.splice(hoverIndex - 1, 0, dragTask);
      } else {
        dropColumn.splice(hoverIndex - 1, 0, dragTask);
        dropColumn.forEach(async (task, i) => {
          task.order = i + 1;
        });
      }
      dragColumn.forEach(async (task, i) => {
        task.order = i + 1;
      });
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
        const sortedColumns: IColumn[] = action.payload.columns.sort(
          (a: IColumn, b: IColumn) => a.order - b.order
        );

        sortedColumns.map((col) => {
          const sortedTasks = col.tasks.sort((a, b) => a.order - b.order);
          return {
            ...col,
            tasks: sortedTasks,
          };
        });

        state.data = action.payload;
        state.data.columns = sortedColumns;
        state.isLoading = false;
      })
      .addCase(getBoard.rejected, (state, action) => {
        state.error = String(action.payload);
      })

      // create column
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

export const { moveColumn, moveTask } = boardSlice.actions;

export default boardSlice.reducer;
