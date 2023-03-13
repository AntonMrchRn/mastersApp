import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiHost } from '../../../api/axios';
import { storageMMKV } from '../../../mmkv/storage';

export const fetchUserAuth = createAsyncThunk(
  '/auth',
  async ({ tel, email, password, isPhoneAuth }, thunkApi) => {
    const phoneNumber = '7' + tel;

    try {
      const { data } = await apiHost.post('login', {
        login: isPhoneAuth ? phoneNumber : email,
        password,
      });

      storageMMKV.set('token', data.token);

      return data;
    } catch (error) {
      console.log('error', error.error);
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
