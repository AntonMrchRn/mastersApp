import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';

import { Button } from '../../../components';

import ErrorCross from '../../../assets/icons/svg/auth/ErrorCross';
import { useAppDispatch } from '../../../store';
import {
  clearAuthError,
  clearRecoveryError,
} from '../../../store/slices/auth/actions';

import { styles } from './style';

export const ErrorScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const goBack = () => {
    dispatch(clearRecoveryError());
    dispatch(clearAuthError(null));
    navigation.goBack();
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
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
