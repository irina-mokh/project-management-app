// actions.tsx is for async actions
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { axiosClient } from 'utils/axios';
import { ICreateColumnRequest } from 'types';
import { ITaskPut } from 'types';

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

export const createColumn = createAsyncThunk(
  'column/createColumn',
  async function ({ boardId, requestBody }: ICreateColumnRequest, { rejectWithValue }) {
    try {
      const response = await axiosClient.post(`boards/${boardId}/columns`, requestBody);
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

export const updateColumn = createAsyncThunk(
  'board/updateColumn',
  async function (
    [boardId, columnId, order, title]: [string, string, number, string],
    { rejectWithValue }
  ) {
    try {
      await axiosClient.put(`boards/${boardId}/columns/${columnId}`, {
        title: title,
        order: order,
      });
    } catch (err) {
      return rejectWithValue((err as AxiosError).message);
    }
  }
);

export const updateTask = createAsyncThunk(
  'board/updateTask',
  async function ([task, taskId, dragColumnId]: [ITaskPut, string, string], { rejectWithValue }) {
    const { boardId } = task;
    try {
      await axiosClient.put(`boards/${boardId}/columns/${dragColumnId}/tasks/${taskId}`, task);
    } catch (err) {
      return rejectWithValue((err as AxiosError).message);
    }
  }
);
