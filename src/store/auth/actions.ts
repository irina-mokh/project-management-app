// actions.tsx is for async actions
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { CurUserType, NewUserType } from 'types';
import { axiosClient } from 'utils/axios';
import i18n from 'utils/translation/i18n';

export const createUser = createAsyncThunk(
  'auth/createUser',
  async function (user: NewUserType, { rejectWithValue }) {
    const url = `signup`;
    try {
      const response = await axiosClient.post(url, user);
      if (response.status !== 201) {
        throw new Error(i18n.t('error'));
      } else {
        return response.data;
      }
    } catch (err) {
      let errorMessage;
      if ((err as AxiosError).response?.status === 400) {
        errorMessage = i18n.t('errorUnfilled');
      } else if ((err as AxiosError).response?.status === 409) {
        errorMessage = i18n.t('errorUserExist');
      }
      console.log('Something went wrong ->', errorMessage);
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
        errorMessage = i18n.t('errorUnfilled');
      } else if ((err as AxiosError).response?.status === 403) {
        errorMessage = i18n.t('errorUserNotFound');
      } else if ((err as AxiosError).response?.status === 401) {
        errorMessage = i18n.t('errorTokenExpired');
      }
      console.log('Something went wrong while signin->', errorMessage);
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
      return persData;
    } catch (err) {
      let errorMessage;
      if ((err as AxiosError).response?.status === 401) {
        errorMessage = i18n.t('errorTokenExpired');
      }
      console.log('Something went wrong while getting userData->', errorMessage);
      return rejectWithValue(errorMessage);
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
      return response.data;
    } catch (err) {
      let errorMessage;
      if ((err as AxiosError).response?.status === 404) {
        errorMessage = i18n.t('errorUserNotFound');
      } else if ((err as AxiosError).response?.status === 401) {
        errorMessage = i18n.t('errorTokenExpired');
      }
      console.log('Something went wrong while deleting userData->', errorMessage);
      return rejectWithValue(errorMessage);
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
      return response.data;
    } catch (err) {
      let errorMessage;
      if ((err as AxiosError).response?.status === 401) {
        errorMessage = i18n.t('errorTokenExpired');
      }
      console.log('Something went wrong while editing userData->', errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);
