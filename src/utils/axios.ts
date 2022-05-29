import axios, { AxiosError } from 'axios';
import { errorHandler } from './axiosErrorHandler';
import { ITaskPut } from 'types';

export const axiosClient = axios.create({
  baseURL: 'https://thawing-spire-17017.herokuapp.com/',
  timeout: 5000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  // валидация всех ответов от сервера
  validateStatus: (status) => {
    return status >= 200 && status <= 299;
  },
});

axiosClient.interceptors.request.use(
  async (config) => {
    const value = localStorage.getItem('token');

    if (value) {
      Object.assign(config.headers, {
        Authorization: `Bearer ${value}`,
      });
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    const {
      data: { token },
    } = response;

    if (token) {
      localStorage.setItem('token', token);
    }

    return response;
  },
  async (error: AxiosError) => {
    // глобальный обработчик ошибок
    errorHandler(error.response?.status);
    return Promise.reject(error);
  }
);

export const updateColumn = async (
  boardId: string,
  columnId: string,
  order: number,
  title: string
) => {
  try {
    await axiosClient.put(`boards/${boardId}/columns/${columnId}`, {
      title: title,
      order: order,
    });
  } catch (err) {
    console.error(err);
  }
};

export const updateTask = async (task: ITaskPut, taskId: string, dragColumnId: string) => {
  const { boardId } = task;
  try {
    const response = await axiosClient.put(
      `boards/${boardId}/columns/${dragColumnId}/tasks/${taskId}`,
      task
    );
    return response;
  } catch (err) {
    console.error(err);
  }
};
