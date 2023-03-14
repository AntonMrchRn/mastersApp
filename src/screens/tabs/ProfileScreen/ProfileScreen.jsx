import React from 'react';
import { Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Button } from '~/components';

import { storageMMKV } from '../../../mmkv/storage';
import { notLogin } from '../../../redux/slices/auth/reducer';

import styles from './style';

export const ProfileScreen = () => {
  const dispatch = useDispatch();

  const onExit = () => {
    storageMMKV.clearAll();
    dispatch(notLogin());
  };

  return (
    <View style={styles.container}>
      <Text>Профиль</Text>
      <Button label="Выйти из аккаунта" onPress={onExit} />
    </View>
  );
};
