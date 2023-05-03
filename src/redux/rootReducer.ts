import { combineReducers } from '@reduxjs/toolkit';

import auth from './slices/auth/reducer';

const rootReducer = combineReducers({
  auth,
});

export default rootReducer;
