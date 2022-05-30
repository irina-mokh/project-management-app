// actions.tsx is for async actions
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { axiosClient } from 'utils/axios';
import { ICreateBoardFields } from '../../types';

export const getBoards = createAsyncThunk(
  'boardList/getBoards',
  async function (arg, { rejectWithValue }) {
    try {
      const response = await axiosClient.get('boards');
      if (response.statusText !== 'OK') {
        throw new Error('Error');
      }
      return response.data;
    } catch (err) {
      return rejectWithValue((err as AxiosError).message);
    }
  }
);

export const deleteBoard = createAsyncThunk(
  'boards/deleteBoard',
  async function (id: string, { rejectWithValue }) {
    try {
      await axiosClient.delete(`boards/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue((err as AxiosError).message);
    }
  }
);

export const createBoard = createAsyncThunk(
  'boards/createBoard',
  async function (requestBody: ICreateBoardFields, { rejectWithValue }) {
    try {
      const response = await axiosClient.post('boards', requestBody);
      if (response.status !== 201) {
        console.error(response);
        throw new Error('Error with code: ' + response.status);
      }
      return response.data;
    } catch (err) {
      return rejectWithValue((err as AxiosError).message);
    }
  }
);
