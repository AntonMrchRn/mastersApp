import { AnyAction, combineReducers, Reducer } from '@reduxjs/toolkit';

import { authAPI } from '@/store/api/auth';
import { userAPI } from '@/store/api/user';
import { RootState } from '@/store/index';
import auth from '@/store/slices/auth/reducer';
import user from '@/store/slices/user/reducer';

import { tasksAPI } from './api/tasks';

import myTasks from './slices/myTasks/reducer';
import tasks from './slices/tasks/reducer';
import taskSearch from './slices/taskSearch/reducer';

const combinedReducer = combineReducers({
  auth: auth.reducer,
  user: user.reducer,
  tasks: tasks.reducer,
  taskSearch: taskSearch.reducer,
  myTasks: myTasks.reducer,
  [authAPI.reducerPath]: authAPI.reducer,
  [userAPI.reducerPath]: userAPI.reducer,
  [tasksAPI.reducerPath]: tasksAPI.reducer,
});

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === 'auth/logOut') {
    state = {} as RootState;
  }

  return combinedReducer(state, action);
};

export default rootReducer;
