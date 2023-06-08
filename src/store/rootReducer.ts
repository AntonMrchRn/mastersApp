import { combineReducers } from '@reduxjs/toolkit';

import { authAPI } from '@/store/api/auth';
import userAuth from '@/store/slices/auth/reducer';

import taskSearch from './slices/taskSearch/reducer';

const rootReducer = combineReducers({
  auth: userAuth.reducer,
  taskSearch: taskSearch.reducer,
  [authAPI.reducerPath]: authAPI.reducer,
});

export default rootReducer;
