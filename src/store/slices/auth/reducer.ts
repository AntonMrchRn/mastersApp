import { createSlice } from '@reduxjs/toolkit';

import { InitialState } from './types';

const initialState: InitialState = {
  user: null,
  isAuth: false,
  timeoutPhone: null,
  timeoutEmail: null,
  isActiveTimerPhone: false,
  isActiveTimerEmail: false,
  isRecoveryByPhone: false,
  isRecoveryByEmail: false,
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: state => {
      state.isAuth = true;
    },
    logOut: state => {
      state.isAuth = false;
    },
    setUserAuth: (state, { payload }) => {
      state.user = payload;
    },
    setIsRecoveryByPhone: state => {
      state.isRecoveryByPhone = true;
    },
    setIsRecoveryByEmail: state => {
      state.isRecoveryByEmail = true;
    },
    clearIsRecoveryByPhone: state => {
      state.isRecoveryByPhone = false;
    },
    clearIsRecoveryByEmail: state => {
      state.isRecoveryByEmail = false;
    },
    timerOnPhone: state => {
      state.isActiveTimerPhone = true;
    },
    timerOffPhone: state => {
      state.isActiveTimerPhone = false;
    },
    timerOnEmail: state => {
      state.isActiveTimerEmail = true;
    },
    timerOffEmail: state => {
      state.isActiveTimerEmail = false;
    },
    timeoutAsyncPhone: (state, { payload }) => {
      state.timeoutPhone = payload;
    },
    timeoutAsyncEmail: (state, { payload }) => {
      state.timeoutEmail = payload;
    },
  },
});

export default auth;
