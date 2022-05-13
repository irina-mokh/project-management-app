// actions.tsx is for async actions
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { axiosClient } from 'utils/axios';

export const getBoards = createAsyncThunk(
  'boards/getBoards',
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
