import { createSlice } from '@reduxjs/toolkit';

import { InitialState } from './types';

const initialState: InitialState = {
  linkTimeout: null,
  phoneTimeout: null,
  emailTimeout: null,
  isPhoneEditing: false,
  isEmailEditing: false,
  isLinkGenerating: false,
  isActiveLinkTimer: false,
  isActivePhoneTimer: false,
  isActiveEmailTimer: false,
  filesOnDevice: undefined,
  isApprovalNotificationShown: false,
  progresses: {},
  filesLoading: undefined,
};

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsApprovalNotificationShown: (state, { payload }) => {
      state.isApprovalNotificationShown = payload;
    },
    setIsPhoneEditing: (state, { payload }) => {
      state.isPhoneEditing = payload;
    },
    setUserFileLoading: (state, { payload }) => {
      state.filesLoading = { ...state.filesLoading, ...payload };
    },
    setIsEmailEditing: (state, { payload }) => {
      state.isEmailEditing = payload;
    },
    setIsLinkGenerating: (state, { payload }) => {
      state.isLinkGenerating = payload;
    },
    timerOnProfilePhone: state => {
      state.isActivePhoneTimer = true;
    },
    timerOffProfilePhone: state => {
      state.isActivePhoneTimer = false;
    },
    timerOnProfileEmail: state => {
      state.isActiveEmailTimer = true;
    },
    timerOffProfileEmail: state => {
      state.isActiveEmailTimer = false;
    },
    timerOnLink: state => {
      state.isActiveLinkTimer = true;
    },
    timerOffLink: state => {
      state.isActiveLinkTimer = false;
    },
    setLinkTimeout: (state, { payload }) => {
      state.linkTimeout = payload;
    },
    setProfilePhoneTimeout: (state, { payload }) => {
      state.phoneTimeout = payload;
    },
    setProfileEmailTimeout: (state, { payload }) => {
      state.emailTimeout = payload;
    },
    setUserFilesOnDevice: (state, { payload }) => {
      state.filesOnDevice = payload;
    },
    setUserFileOnDevice: (state, { payload }) => {
      state.filesOnDevice = { ...state.filesOnDevice, ...payload };
    },
    setProgresses: (state, { payload }) => {
      state.progresses = { ...state.progresses, ...payload };
    },
    deleteProgress: (state, { payload }) => {
      delete state.progresses[payload];
    },
  },
});

export default user;
