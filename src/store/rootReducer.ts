import { combineReducers } from '@reduxjs/toolkit';

import { authAPI } from '@/store/api/auth';
import { userAPI } from '@/store/api/user';
import auth from '@/store/slices/auth/reducer';

import { tasksAPI } from './api/tasks';

import myTasks from './slices/myTasks/reducer';
import tasks from './slices/tasks/reducer';
import taskSearch from './slices/taskSearch/reducer';

const rootReducer = combineReducers({
  auth: auth.reducer,
  tasks: tasks.reducer,
  taskSearch: taskSearch.reducer,
  myTasks: myTasks.reducer,
  [authAPI.reducerPath]: authAPI.reducer,
  [userAPI.reducerPath]: userAPI.reducer,
  [tasksAPI.reducerPath]: tasksAPI.reducer,
});

export default rootReducer;
