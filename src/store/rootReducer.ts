import { combineReducers } from '@reduxjs/toolkit';

import { authAPI } from '@/store/api/auth';
import userAuth from '@/store/slices/auth/reducer';

import { tasksAPI } from './api/tasks';

const rootReducer = combineReducers({
  auth: userAuth.reducer,
  [authAPI.reducerPath]: authAPI.reducer,
  [tasksAPI.reducerPath]: tasksAPI.reducer,
});

export default rootReducer;
