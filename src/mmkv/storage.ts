import { MMKV } from 'react-native-mmkv';

import { Storage } from 'redux-persist';

export const storageMMKV = new MMKV();

export const reduxStorage: Storage = {
  setItem: (key, value) => {
    storageMMKV.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = storageMMKV.getString(key);
    return Promise.resolve(value);
  },
  removeItem: key => {
    storageMMKV.delete(key);
    return Promise.resolve();
  },
};
