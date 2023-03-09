import { createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiHost } from '../../../api/axios';
import { storageMMKV } from '../../../mmkv/storage';

export const fetchUserAuth = createAsyncThunk(
  '/auth',
  async ({ tel, email, password, isPhoneAuth }, thunkApi) => {
    console.log(
      'tel',
      tel,
      'mail',
      email,
      'password',
      password,
      'isPhoneAuth',
      isPhoneAuth
    );

    try {
      const { data } = await apiHost.post('login', {
        login: isPhoneAuth ? tel : email,
        password,
      });
      // storageMMKV.set('token', '30340034024');
      return data;
    } catch (error) {
      console.log('error', error.error);
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
