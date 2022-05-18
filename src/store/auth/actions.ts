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
        password: user.password,
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
export const getUserPersData = createAsyncThunk(
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
      const persData = {
        userId: arrUser[0].id,
        userName: arrUser[0].name,
      };
      console.log('aa', arrUser);
      return persData;
    } catch (err) {
      /*let errorMessage;
      if ((err as AxiosError).response?.status === 400) {
        errorMessage = 'Fill fields to sign in';
      } else if ((err as AxiosError).response?.status === 403) {
        errorMessage = 'User with such login/password was not found';
      }*/
      console.log('err', err);
      return rejectWithValue(err as AxiosError);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'auth/deleteUser',
  async function (userId: null | string, { rejectWithValue }) {
    const url = `users/${userId}`;
    try {
      const response = await axiosClient.delete(url);
      if (response.status !== 204) {
        throw new Error('Error');
      }
      console.log('nansn', response);
      return response;
    } catch (err) {
      /*let errorMessage;
      if ((err as AxiosError).response?.status === 400) {
        errorMessage = 'Fill fields to sign in';
      } else if ((err as AxiosError).response?.status === 403) {
        errorMessage = 'User with such login/password was not found';
      }*/
      console.log('err', err);
      return rejectWithValue(err as AxiosError);
    }
  }
);

export const editUser = createAsyncThunk(
  'auth/editUser',
  async function (
    { userId, newData }: { userId: null | string; newData: NewUserType },
    { rejectWithValue }
  ) {
    const url = `users/${userId}`;
    try {
      const response = await axiosClient.put(url, newData);
      if (response.status !== 200) {
        throw new Error('Error');
      }
      console.log('nansn', response);
      return response;
    } catch (err) {
      /*let errorMessage;
      if ((err as AxiosError).response?.status === 400) {
        errorMessage = 'Fill fields to sign in';
      } else if ((err as AxiosError).response?.status === 403) {
        errorMessage = 'User with such login/password was not found';
      }*/
      console.log('errEdit', err);
      return rejectWithValue(err as AxiosError);
    }
  }
);
