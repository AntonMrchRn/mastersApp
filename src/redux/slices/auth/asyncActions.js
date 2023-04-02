import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiHost } from '../../../api/axios';
import { storageMMKV } from '../../../mmkv/storage';

export const fetchUserAuth = createAsyncThunk(
  '/auth',
  async ({ tel, email, password, isPhoneAuth }, thunkApi) => {
    const phoneNumber = '7' + tel;

    try {
      const { data } = await apiHost.post('login?isMobile=true', {
        login: isPhoneAuth ? phoneNumber : email,
        password,
      });

      storageMMKV.set('token', data.token);

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const recoveryPassword = createAsyncThunk(
  '/recoveryPassword',
  async ({ password, email, isPhoneAuth, tel }, thunkApi) => {
    const phoneNumber = '7' + tel;
    try {
      const { data } = isPhoneAuth
        ? await apiHost.patch('me/password', {
            phone: Number(phoneNumber),
            password: password,
          })
        : await apiHost.patch('me/password', {
            email,
            password: password,
          });
      if (isPhoneAuth) {
        const jsonValue = JSON.stringify(data);
        await AsyncStorage.setItem('time', jsonValue);
        return { data: data, isPhoneAuth: isPhoneAuth };
      }
      if (!isPhoneAuth) {
        const jsonValue = JSON.stringify(data);
        await AsyncStorage.setItem('timeEmail', jsonValue);
        return { data: data, isPhoneAuth: isPhoneAuth };
      }
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const restorePassword = createAsyncThunk(
  'restorePassword',
  async ({ password, value }, thunkApi) => {
    try {
      const { data } = await apiHost.patch('me/password', {
        code: value,
        password: password,
      });
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem('time', jsonValue);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
