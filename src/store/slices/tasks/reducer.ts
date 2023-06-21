import { createSlice } from '@reduxjs/toolkit';

import { InitialState } from './types';

const initialState: InitialState = {
  progresses: {},
};

const tasks = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setProgresses: (state, action) => {
      state.progresses = { ...state.progresses, ...action.payload };
    },
    deleteProgress: (state, action) => {
      delete state.progresses[action.payload];
    },
  },
});

export default tasks;
