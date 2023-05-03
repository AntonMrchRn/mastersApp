import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';

import Header from '../../../components/Header/Header';
import { Button } from '../../../components/Button';
import ErrorCross from '../../../components/svg/auth/ErrorCross';
import {
  clearAuthError,
  clearRecoveryError,
} from '../../../redux/slices/auth/reducer';

import { styles } from './style';

export const ErrorScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const goBack = () => {
    dispatch(clearRecoveryError());
    // @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
    dispatch(clearAuthError());
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header label={''} callBack={goBack} />
      <View style={styles.wrapperSignIn}>
        <View style={styles.containerInfo}>
          <ErrorCross />
          <Text style={styles.title}>Сервис временно недоступен</Text>
          <Text style={styles.text}>
            Повторите попытку или попробуйте войти позже, скоро мы всё починим
          </Text>
        </View>
      </View>
      <Button label="Повторить попытку" onPress={goBack} />
    </SafeAreaView>
  );
};
