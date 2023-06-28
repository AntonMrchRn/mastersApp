import { createSlice } from '@reduxjs/toolkit';

import { InitialState } from './types';

const initialState: InitialState = {
  user: null,
  isAuth: false,
  phoneTimeout: null,
  emailTimeout: null,
  isActivePhoneTimer: false,
  isActiveEmailTimer: false,
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
    setIsRecoveryByPhone: (state, { payload }) => {
      state.isRecoveryByPhone = payload;
    },
    setIsRecoveryByEmail: (state, { payload }) => {
      state.isRecoveryByEmail = payload;
    },
    timerOnAuthPhone: state => {
      state.isActivePhoneTimer = true;
    },
    timerOffAuthPhone: state => {
      state.isActivePhoneTimer = false;
    },
    timerOnAuthEmail: state => {
      state.isActiveEmailTimer = true;
    },
    timerOffAuthEmail: state => {
      state.isActiveEmailTimer = false;
    },
    setAuthPhoneTimeout: (state, { payload }) => {
      state.phoneTimeout = payload;
    },
    setAuthEmailTimeout: (state, { payload }) => {
      state.emailTimeout = payload;
    },
  },
});

export default auth;
