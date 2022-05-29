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

      return response.data;
    } catch (err) {
      let errorMessage;

      switch ((err as AxiosError).response?.status) {
        case 400:
          errorMessage = i18n.t('errorUnfilled');
          break;
        case 409:
          errorMessage = i18n.t('errorUserExist');
          break;
        default:
          errorMessage = i18n.t('error');
      }

      console.error('Something went wrong ->', errorMessage);
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

      const resData = {
        token: response.data.token,
        login: user.login,
        password: user.password,
      };

      return resData;
    } catch (err) {
      let errorMessage;

      switch ((err as AxiosError).response?.status) {
        case 400:
          errorMessage = i18n.t('errorUnfilled');
          break;
        case 403:
          errorMessage = i18n.t('errorUserNotFound');
          break;
        default:
          errorMessage = i18n.t('error');
      }

      console.error('Something went wrong while signin->', errorMessage);
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

      const arrUser = response.data.filter((item: NewUserType) => {
        return item.login === login;
      });

      const persData = {
        userId: arrUser[0].id,
        userName: arrUser[0].name,
      };

      return persData;
    } catch (err) {
      console.error('Something went wrong while getting userData->', (err as AxiosError).message);
      return rejectWithValue((err as AxiosError).message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'auth/deleteUser',
  async function (userId: null | string, { rejectWithValue }) {
    const url = `users/${userId}`;
    try {
      const response = await axiosClient.delete(url);

      return response.data;
    } catch (err) {
      const errorMessage =
        (err as AxiosError).status == '404'
          ? i18n.t('errorUserNotFound')
          : (err as AxiosError).message;

      console.error('Something went wrong while deleting userData->', errorMessage);
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

      return response.data;
    } catch (err) {
      /*let errorMessage;
      if ((err as AxiosError).response?.status === 400) {
        errorMessage = 'Fill fields to sign in';
      } else if ((err as AxiosError).response?.status === 403) {
        errorMessage = 'User with such login/password was not found';
      }*/
      console.error('Something went wrong while editing userData->', err as AxiosError);
      return rejectWithValue((err as AxiosError).message);
    }
  }
);
