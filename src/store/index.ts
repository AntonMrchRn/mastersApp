import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';

import { reduxStorage } from '@/mmkv/storage';
import { api } from '@/store/api';
import { rootReducer } from '@/store/rootReducer';

const createDebugger = require('redux-flipper').default;

const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  whitelist: ['auth'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        immutableCheck: false,
        ignoredActions: ['persist/PERSIST'],
      },
    })
      .concat(api.middleware)
      .concat(createDebugger()),
});

const persistor = persistStore(store);

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type { RootState };
export { store, persistor, useAppDispatch, useAppSelector };
