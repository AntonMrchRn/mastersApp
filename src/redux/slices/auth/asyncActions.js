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
      console.log('error', error.error);
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const recoveryPassword = createAsyncThunk(
  '/recoveryPassword',
  async ({ tel, email, isPhoneAuth }, thunkApi) => {
    const phoneNumber = '7' + tel;

    try {
      // const { data } = isPhoneAuth
      //   ? await apiHost.patch('me/password', {
      //       phone: Number(phoneNumber),
      //     })
      //   : await apiHost.patch('me/password', {
      //       email,
      //     });
      // return data;
    } catch (error) {
      console.log('error', error.error);
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
