import { combineReducers } from '@reduxjs/toolkit';

import { authAPI } from '@/store/api/auth';
import userAuth from '@/store/slices/auth/reducer';

const rootReducer = combineReducers({
  auth: userAuth.reducer,
  [authAPI.reducerPath]: authAPI.reducer,
});

export default rootReducer;
