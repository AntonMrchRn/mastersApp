import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Button } from '~/components';

import { storageMMKV } from '../../../mmkv/storage';
import { logOut } from '../../../redux/slices/auth/reducer';

import styles from './style';

export const ProfileScreen = () => {
  const dispatch = useDispatch();

  const onExit = () => {
    storageMMKV.clearAll();
    dispatch(logOut());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Профиль</Text>
      <Button label="Выйти из аккаунта" onPress={onExit} flag={true} />
    </View>
  );
};
