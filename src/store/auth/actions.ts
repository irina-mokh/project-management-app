// actions.tsx is for async actions
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { CurUserType, NewUserType } from 'types';
import { axiosClient } from 'utils/axios';

export const createUser = createAsyncThunk(
  'auth/createUser',
  async function (user: NewUserType, { rejectWithValue }) {
    const url = `signup`;
    try {
      const response = await axiosClient.post(url, user);
      if (response.status !== 201) {
        throw new Error('Error');
      } else {
        return response.data;
      }
    } catch (err) {
      let errorMessage;
      if ((err as AxiosError).response?.status === 400) {
        errorMessage = 'Fill fields to sign up';
      } else if ((err as AxiosError).response?.status === 409) {
        errorMessage = 'User login already exists!';
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const signInUser = createAsyncThunk(
  'auth/signInUser',
  async function (user: CurUserType, { rejectWithValue }) {
    const url = `signin`;
    try {
      const response = await axiosClient.post(url, user);
      if (response.status !== 201) {
        throw new Error('Error');
      }
      const resData = {
        token: response.data.token,
        login: user.login,
      };
      return resData;
    } catch (err) {
      let errorMessage;
      if ((err as AxiosError).response?.status === 400) {
        errorMessage = 'Fill fields to sign in';
      } else if ((err as AxiosError).response?.status === 403) {
        errorMessage = 'User with such login/password was not found';
      }
      return rejectWithValue(errorMessage);
    }
  }
);
export const getUserId = createAsyncThunk(
  'auth/getUserId',
  async function (login: null | string, { rejectWithValue }) {
    const url = `users`;
    try {
      const response = await axiosClient.get(url);
      if (response.status !== 200) {
        throw new Error('Error');
      }
      const arrUser = response.data.filter((item: NewUserType) => {
        return item.login === login;
      });
      return arrUser[0].id;
    } catch (err) {
      /*let errorMessage;
      if ((err as AxiosError).response?.status === 400) {
        errorMessage = 'Fill fields to sign in';
      } else if ((err as AxiosError).response?.status === 403) {
        errorMessage = 'User with such login/password was not found';
      }*/
      return rejectWithValue(err as AxiosError);
    }
  }
);
