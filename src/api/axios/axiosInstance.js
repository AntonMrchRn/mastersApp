import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { host } from '../config';

export const axiosInstance = axios.create({
  baseURL: host,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(async config => {
  config.headers.Authorization = `Bearer ${await AsyncStorage.getItem(
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
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      try {
        const { data } = await axiosInstance.post('/Account/Refresh', {
          token: refreshToken,
        });

        if (data) {
          await AsyncStorage.setItem('token', data.token);
          await AsyncStorage.setItem('refreshToken', data.refresh);
          return axiosInstance.request(originalRequest);
        }
      } catch (err) {
        console.log('ERROR_INTERCEPTORS', err);
        await AsyncStorage.removeItem('token');
      }
    }
  }
);
