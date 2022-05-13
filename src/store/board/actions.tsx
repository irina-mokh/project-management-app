// actions.tsx is for async actions
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { axiosClient } from 'utils/axios';

export const getBoard = createAsyncThunk(
  'boards/getBoards',
  async function (id, { rejectWithValue }) {
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
