import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiHost } from '../../../api/axios';
import { storageMMKV } from '../../../mmkv/storage';

export const fetchUserAuth = createAsyncThunk(
  '/auth',
  // @ts-expect-error TS(2339): Property 'tel' does not exist on type 'void'.
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
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const recoveryPassword = createAsyncThunk(
  '/recoveryPassword',
  // @ts-expect-error TS(7030): Not all code paths return a value.
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
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const restorePassword = createAsyncThunk(
  'restorePassword',
  // @ts-expect-error TS(2339): Property 'password' does not exist on type 'void'.
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
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
