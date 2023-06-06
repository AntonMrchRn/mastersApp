import { createSlice } from '@reduxjs/toolkit';

import { InitialState } from './types';

const initialState: InitialState = {
  user: null,
  isAuth: false,
  timeoutPhone: null,
  timeoutEmail: null,
  isActiveTimer: false,
  isActiveTimerEmail: false,
  isRecoveryByPhone: false,
  isRecoveryByEmail: false,
};

const userAuth = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    login: state => {
      state.isAuth = true;
    },
    logOut: state => {
      state.isAuth = false;
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
      state.isActiveTimer = true;
    },
    timerOffPhone: state => {
      state.isActiveTimer = false;
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

export default userAuth;
