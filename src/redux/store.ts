import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
const createDebugger = require('redux-flipper').default;

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(createDebugger()),
});

// eslint-disable-next-line no-undef
export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
