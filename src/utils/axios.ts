import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: 'https://thawing-spire-17017.herokuapp.com/',
  timeout: 5000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
/*
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
    console.log(error);
    return Promise.reject(error);
  }
);
*/
