import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Button } from '../../../components/Button/Button';

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
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapperCenter}>
        <Text style={styles.text}>Профиль</Text>
        <Button label="Выйти из аккаунта" onPress={onExit} />
      </View>
    </SafeAreaView>
  );
};
