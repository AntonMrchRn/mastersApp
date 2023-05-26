import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { AuthAPI } from '../../../services/api/auth';

import { storageMMKV } from '../../../mmkv/storage';

import { RestorePasswordParams, UserAuthParams } from './types';

export const fetchUserAuth = createAsyncThunk(
  '/auth',
  async (
    { phoneNumber, email, password, isPhoneAuth }: UserAuthParams,
    thunkApi
  ) => {
    try {
      const user = await AuthAPI.fetchUserAuth({
        phoneNumber,
        email,
        password,
        isPhoneAuth,
      });
      storageMMKV.set('token', user.token);

      return user;
    } catch (error) {
      return thunkApi.rejectWithValue((error as AxiosError).response?.data);
    }
  }
);

export const recoveryPassword = createAsyncThunk(
  '/recoveryPassword',
  async (
    { phoneNumber, email, password, isPhoneAuth }: UserAuthParams,
    thunkApi
  ) => {
    try {
      const data = await AuthAPI.recoveryPassword({
        phoneNumber,
        email,
        password,
        isPhoneAuth,
      });

      if (isPhoneAuth) {
        const jsonValue = JSON.stringify(data);
        await AsyncStorage.setItem('time', jsonValue);
        return { data, isPhoneAuth };
      } else {
        const jsonValue = JSON.stringify(data);
        await AsyncStorage.setItem('timeEmail', jsonValue);
        return { data, isPhoneAuth };
      }
    } catch (error) {
      return thunkApi.rejectWithValue((error as AxiosError).response?.data);
    }
  }
);

export const restorePassword = createAsyncThunk(
  'restorePassword',
  async ({ password, value }: RestorePasswordParams, thunkApi) => {
    try {
      const data = await AuthAPI.restorePassword({ password, value });
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem('time', jsonValue);

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue((error as AxiosError).response?.data);
    }
  }
);
