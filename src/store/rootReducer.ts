import { combineReducers } from '@reduxjs/toolkit';

import userAuth from '@/store/slices/auth/reducer';

import taskSearch from './slices/taskSearch/reducer';

const rootReducer = combineReducers({
  auth: userAuth.reducer,
  taskSearch: taskSearch.reducer,
});

export default rootReducer;
