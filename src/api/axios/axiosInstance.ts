import axios from 'axios';
import { storageMMKV } from '../../mmkv/storage';
import { host } from '../config';

export const axiosInstance = axios.create({
  baseURL: host,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(async config => {
  config.headers.Authorization = `Bearer ${await storageMMKV.getString(
    'token'
  )}`;
  return config;
});

axiosInstance.interceptors.response.use(
  async config => {
    return config;
  },
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401) {
      try {
        const { data } = await axiosInstance.post('/relogin');
        if (data) {
          console.log('data relogin token', data);
          await storageMMKV.set('token', data.token);
          return axiosInstance.request(originalRequest);
        }
      } catch (err) {
        console.log('ERROR_INTERCEPTORS', err);
      }
    }
    return;
  }
);
