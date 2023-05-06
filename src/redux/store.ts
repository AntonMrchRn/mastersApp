import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
const createDebugger = require('redux-flipper').default;

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(createDebugger()),
});

// это исключение для следующес троки и проверки ReturnType если еще у тебя будеть такие ошибки тоесть испортировать нечего
// можешь исползовать
//eslint-disable-next-line no-undef
export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
