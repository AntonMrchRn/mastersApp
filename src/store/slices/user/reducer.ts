import { createSlice } from '@reduxjs/toolkit';

import { InitialState } from './types';

const initialState: InitialState = {
  user: null,
};

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    },
  },
});

export default user;
