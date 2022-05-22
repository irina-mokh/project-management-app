// actions.tsx is for async actions
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { axiosClient } from 'utils/axios';
import { ICreateColumnRequest, ICreateTask } from 'types';

type ICreateTaskArgs = {
  url: { boardId: string; columnId: string };
  data: ICreateTask;
};

export const getBoard = createAsyncThunk(
  'board/getBoard',
  async function (id: string, { rejectWithValue }) {
    try {
      const response = await axiosClient.get(`boards/${id}`);
      if (response.statusText !== 'OK') {
        throw new Error('Error');
      }

      console.log('recived from BE');
      console.log(response);

      return response.data;
    } catch (err) {
      return rejectWithValue((err as AxiosError).message);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  'auth/getAllUsers',
  async function (arg, { rejectWithValue }) {
    const url = 'users';

    try {
      const response = await axiosClient.get(url);

      if (response.status !== 200) {
        throw new Error("Can't' fetch users");
      }

      return response.data;
    } catch (err) {
      return rejectWithValue((err as AxiosError).message);
    }
  }
);

export const createColumn = createAsyncThunk(
  'column/createColumn',
  async function ({ boardId, title }: ICreateColumnRequest, { rejectWithValue }) {
    try {
      const response = await axiosClient.post(`boards/${boardId}/columns`, { title });
      if (response.status !== 201) {
        throw new Error('Error');
      }
      return response.data;
    } catch (err) {
      return rejectWithValue((err as AxiosError).message);
    }
  }
);

export const deleteColumn = createAsyncThunk(
  'board/deleteColumn',
  async function ([boardId, columnId]: [string, string], { rejectWithValue }) {
    try {
      await axiosClient.delete(`boards/${boardId}/columns/${columnId}`);

      return columnId;
    } catch (err) {
      return rejectWithValue((err as AxiosError).message);
    }
  }
);

// createTask
export const createTask = createAsyncThunk(
  'board/createTask',
  async function ({ url, data }: ICreateTaskArgs, { rejectWithValue }) {
    const { boardId, columnId } = url;
    try {
      const response = await axiosClient.post(`boards/${boardId}/columns/${columnId}/tasks`, data);

      if (response.status != 201) {
        throw new Error();
      }

      /*
      {
        "id": "e21ef376-eef6-45ca-9d3c-dfa19944429c",
        "title": "Task: pet the cat --- ",
        "description": "Domestic cat needs to be stroked gently",
        "userId": "5d83b5e1-d725-41e4-af79-51a6df6d4e26"
      }
      */

      console.log(response.data);
      return { columnId: columnId, taskDetails: response.data };
    } catch (err) {
      return rejectWithValue((err as AxiosError).message);
    }
  }
);

// deleteTask
export const deleteTask = createAsyncThunk(
  'board/deleteTask',
  async function ([boardId, columnId, taskId]: [string, string, string], { rejectWithValue }) {
    try {
      await axiosClient.delete(`boards/${boardId}/columns/${columnId}/tasks/${taskId}`);

      return { taskId: taskId, columnId: columnId };
    } catch (err) {
      return rejectWithValue((err as AxiosError).message);
    }
  }
);
