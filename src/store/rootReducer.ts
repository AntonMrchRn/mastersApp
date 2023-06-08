import { combineReducers } from '@reduxjs/toolkit';

import { authAPI } from '@/store/api/auth';
import userAuth from '@/store/slices/auth/reducer';

import { tasksAPI } from './api/tasks';
import taskSearch from './slices/taskSearch/reducer';

const rootReducer = combineReducers({
  auth: userAuth.reducer,
  taskSearch: taskSearch.reducer,
  [authAPI.reducerPath]: authAPI.reducer,
  [tasksAPI.reducerPath]: tasksAPI.reducer,
});

export default rootReducer;
