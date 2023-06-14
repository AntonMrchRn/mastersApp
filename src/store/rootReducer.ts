import { combineReducers } from '@reduxjs/toolkit';

import { authAPI } from '@/store/api/auth';
import { userAPI } from '@/store/api/user';
import auth from '@/store/slices/auth/reducer';

import { tasksAPI } from './api/tasks';

import taskSearch from './slices/taskSearch/reducer';

const rootReducer = combineReducers({
  auth: auth.reducer,
  taskSearch: taskSearch.reducer,
  [authAPI.reducerPath]: authAPI.reducer,
  [userAPI.reducerPath]: userAPI.reducer,
  [tasksAPI.reducerPath]: tasksAPI.reducer,
});

export default rootReducer;
