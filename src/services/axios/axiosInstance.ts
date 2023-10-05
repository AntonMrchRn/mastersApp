import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';

import { storageMMKV } from '@/mmkv/storage';
import { store } from '@/store';
import { logOut } from '@/store/slices/auth/actions';

import { host } from './config';

export const axiosInstance = axios.create({
  baseURL: host,
  headers: {
    'Content-Type': 'application/json',
  },
});
const { dispatch } = store;

// Проверка интернета
axiosInstance.interceptors.request.use(config => {
  const controller = new AbortController();
  let status;

  const unsubscribe = NetInfo.addEventListener(networkState => {
    status = networkState.isConnected;
  });

  if (status === false) {
    controller.abort();
  }

  unsubscribe();
  return {
    signal: controller.signal,
    ...config,
  };
});

// Реквест перехватчик
axiosInstance.interceptors.request.use(config => {
  config.headers['M-Token'] = storageMMKV.getString('token');

  return config;
});

// Респонс перехватчик
axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalConfig = error.config;
    if (error.response) {
      if (error.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const res = await axiosInstance.get('/relogin');

          storageMMKV.set('token', res.data);
          axiosInstance.defaults.headers.common['M-Token'] = res.data;

          return axiosInstance(originalConfig);
        } catch (error) {
          return Promise.reject(error);
        }
      }

      if (error.response.status === 400 && error.response.data.code === 1009) {
        try {
          storageMMKV.clearAll();
          dispatch(logOut());
        } catch (err) {
          console.log('ERROR_INTERCEPTORS', err);
        }
      }
      return Promise.reject(error);
    }

    return Promise.reject(error);
  },
);
