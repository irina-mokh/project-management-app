import { createSlice, current } from '@reduxjs/toolkit';
import { IBoardDetails, IColumn, IUser, ITask, ITaskPutResponse } from 'types';
import {
  getBoard,
  getAllUsers,
  createColumn,
  deleteColumn,
  createTask,
  updateTask,
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
  searchResults: Array<ITask>;
  isSearchFocus: boolean;
};

const initialState: IBoardState = {
  isLoading: true,
  error: null,
  data: {} as IBoardDetails,
  usersList: [] as Array<IUser>,
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

      const allTasks: ITask[] = columns.map((col: IColumn) => col.tasks).flat();

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
        state.data.columns = state.data.columns.filter((column) => column.id !== action.payload);
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

      // updateTask
      .addCase(updateTask.fulfilled, (state, action) => {
        console.log('start update task');
        const { columnId, id, title, order, done, description, userId } =
          action.payload as ITaskPutResponse;
        // создаём копию массива из state
        const columns = Array.from(state.data.columns);

        // в копии массива заменяем старый таск
        const updatedColumn = columns.find((column) => column.id === columnId);

        if (updatedColumn !== undefined) {
          const taskIdx = updatedColumn.tasks.findIndex((task) => task.id == id);

          // меняем элемент по ссылке
          let editedTask = updatedColumn.tasks[taskIdx];

          editedTask = {
            id: id,
            title: title,
            order: order,
            done: done,
            description: description,
            userId: userId,
          };

          debugger;
        }

        // присваиваем копию массива в state.columns
        state.data.columns = columns;

        debugger;
      })
      .addCase(updateTask.rejected, (state, action) => {
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
