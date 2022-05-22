import { createSlice } from '@reduxjs/toolkit';
import { IBoardDetails, IColumn, IUser, ITask } from 'types';
import {
  getBoard,
  getAllUsers,
  createColumn,
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
  usersList: Array<IUser>;
};

const initialState: IBoardState = {
  isLoading: true,
  error: null,
  data: {} as IBoardDetails,
  usersList: [] as Array<IUser>,
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
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

      // getAllUsers
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.usersList = action.payload;
      })
      .addCase(getAllUsers.rejected, () => {
        console.error('Something went wrong while fetching getAllUsers endpoint :( ');
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

export const { moveColumn } = boardSlice.actions;

export default boardSlice.reducer;
