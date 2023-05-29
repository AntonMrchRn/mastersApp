import { combineReducers } from '@reduxjs/toolkit';

import userAuth from '@/store/slices/auth/reducer';

const rootReducer = combineReducers({
  auth: userAuth.reducer,
});

export default rootReducer;
