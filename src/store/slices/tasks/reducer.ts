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
  },
  extraReducers: builder => {
    builder.addCase(getTaskServices.pending, state => {
      state.loading = true;
    });
    builder.addCase(getTaskServices.fulfilled, (state, { payload }) => {
      state.offerServices = payload.serices;
      state.currentTaskID = payload.taskId;
      state.loading = false;
    });
    builder.addCase(getTaskServices.rejected, (state, { payload }) => {
      state.error = payload as Error;
      state.loading = false;
    });
  },
});

export default tasks;
