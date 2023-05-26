import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';

import { Button } from '../../../components';

import { storageMMKV } from '../../../mmkv/storage';
import { useAppDispatch } from '../../../store';
import { logOut } from '../../../store/slices/auth/actions';

import styles from './style';

export const ProfileScreen = () => {
  const dispatch = useAppDispatch();

  const onExit = () => {
    storageMMKV.clearAll();
    dispatch(logOut());
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapperCenter}>
        <Text style={styles.text}>Профиль</Text>
        <Button label="Выйти из аккаунта" onPress={onExit} />
      </View>
    </SafeAreaView>
  );
};
