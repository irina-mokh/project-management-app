// actions.tsx is for async actions
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { axiosClient } from 'utils/axios';

export const getBoard = createAsyncThunk(
  'board/getBoard',
  async function (id: string, { rejectWithValue }) {
    try {
      const response = await axiosClient.get(`boards/${id}`);
      if (response.statusText !== 'OK') {
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
