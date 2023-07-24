import { createSlice } from '@reduxjs/toolkit';

import { getTaskServices } from './asyncActions';
import { InitialState } from './types';

const initialState: InitialState = {
  progresses: {},
  currentTaskID: undefined,
  offerServices: [],
  loading: false,
  error: undefined,
};

const tasks = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setProgresses: (state, { payload }) => {
      state.progresses = { ...state.progresses, ...payload };
    },
    deleteProgress: (state, { payload }) => {
      delete state.progresses[payload];
    },
    setNewOfferServices: (state, { payload }) => {
      state.offerServices = payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getTaskServices.pending, state => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(getTaskServices.fulfilled, (state, { payload }) => {
      state.offerServices = payload.services;
      state.currentTaskID = payload.taskId;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(getTaskServices.rejected, (state, { payload }) => {
      state.error = payload as Error;
      state.loading = false;
    });
  },
});

export default tasks;
