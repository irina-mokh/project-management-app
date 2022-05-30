import axios from 'axios';
import { routes } from 'routes';
import { store } from 'store';
import { expiredToken } from 'store/auth/reducer';
import { ITaskPut } from 'types';

export const axiosClient = axios.create({
  baseURL: 'https://safe-sea-96771.herokuapp.com/',
  timeout: 5000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
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
    if (token && response.status !== 401) {
      localStorage.setItem('token', token);
    }
    return response;
  },
  async (error) => {
    if (error.response.data.statusCode === 401) {
      store.dispatch(expiredToken());
      //store.dispatch(logOut());
      window.location.href = `${routes.welcome.path}`;
    }

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
    console.log(err);
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
    console.log(err);
  }
};
