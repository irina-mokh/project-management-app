import { createSlice } from '@reduxjs/toolkit';
import { IBoardDetails, ITask } from 'types';
import {
  getBoard,
  createColumn,
  updateColumn,
  deleteColumn,
  createTask,
  deleteTask,
} from './actions';

type ICreateTaskArgs = {
  columnId: string;
  taskDetails: ITask;
};

type IBoardState = {
  isLoading: boolean;
  error: string | null;
  data: IBoardDetails;
};

const initialState: IBoardState = {
  isLoading: true,
  error: null,
  data: {} as IBoardDetails,
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

      // createColumn
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

      // createTask
      .addCase(createTask.fulfilled, (state, action) => {
        const { columnId, taskDetails } = action.payload as ICreateTaskArgs;
        // создаём копию массива из state
        const columns = Array.from(state.data.columns);

        // в копию массива добавляем новый таск
        const updatedColumn = columns.find((column) => column.id === columnId);
        updatedColumn?.tasks.push(taskDetails);

        // присваиваем копию массива в state.columns
        state.data.columns = columns;
      })
      .addCase(createTask.rejected, (state, action) => {
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

// export const {  } = boardSlice.actions;

export default boardSlice.reducer;
