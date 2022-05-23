import axios from 'axios';
import { ITaskPut } from 'types';

export const axiosClient = axios.create({
  baseURL: 'https://thawing-spire-17017.herokuapp.com/',
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
    if (token) {
      localStorage.setItem('token', token);
    }
    return response;
  },
  async (error) => {
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

export const getTask = async (boardId: string, columnId: string, taskId: string) => {
  try {
    const response = await axiosClient.get(`boards/${boardId}/columns/${columnId}/tasks/${taskId}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getColumn = async (boardId: string, columnId: string) => {
  try {
    const response = await axiosClient.get(`boards/${boardId}/columns/${columnId}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const updateTask = async (task: ITaskPut, taskId: string) => {
  console.log(`update task: ${task}`);
  const { boardId, columnId } = task;
  try {
    await axiosClient.put(`boards/${boardId}/columns/${columnId}/tasks/${taskId}`, task);
  } catch (err) {
    console.log(err);
  }
};
