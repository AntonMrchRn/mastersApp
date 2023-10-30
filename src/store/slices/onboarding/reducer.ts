import { createSlice } from '@reduxjs/toolkit';

import { InitialState } from './types';

const initialState: InitialState = {
  onboarding: true,
  visitToolTip: false,
};

const onboarding = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    unActiveOnboarding: state => {
      state.onboarding = false;
    },
    activeToolTip: state => {
      state.visitToolTip = true;
    },
    unActiveToolTip: state => {
      state.visitToolTip = false;
    },
  },
});

export default onboarding;
