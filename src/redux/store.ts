import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './rootReducer';

const createDebugger = require('redux-flipper').default;

const configureCustomStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(createDebugger()),
  });

  return { store };
};

export const { store } = configureCustomStore();
