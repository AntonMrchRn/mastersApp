import { createSlice } from '@reduxjs/toolkit';

import { InitialState } from './types';

const initialState: InitialState = {
  onboarding: true,
};

const onboarding = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    unActiveOnboarding: state => {
      state.onboarding = false;
    },
  },
});

export default onboarding;
