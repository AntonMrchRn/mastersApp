import { combineReducers } from '@reduxjs/toolkit';

import { authAPI } from '@/store/api/auth';
import { userAPI } from '@/store/api/user';
import auth from '@/store/slices/auth/reducer';
import user from '@/store/slices/user/reducer';

import { tasksAPI } from './api/tasks';

import tasks from './slices/tasks/reducer';
import taskSearch from './slices/taskSearch/reducer';

const rootReducer = combineReducers({
  auth: auth.reducer,
  user: user.reducer,
  tasks: tasks.reducer,
  taskSearch: taskSearch.reducer,
  [authAPI.reducerPath]: authAPI.reducer,
  [userAPI.reducerPath]: userAPI.reducer,
  [tasksAPI.reducerPath]: tasksAPI.reducer,
});

export default rootReducer;
