import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { configApp, deviceHeight } from '@/constants/platform';
import { useAppDispatch } from '@/store';
import { clearAuthError } from '@/store/slices/auth/actions';
import {
  AuthScreenName,
  RecoveryScreenNavigationProp,
} from '@/types/navigation';

import styles from './style';

const ForgotPassword = () => {
  const navigation = useNavigation<RecoveryScreenNavigationProp>();
  const dispatch = useAppDispatch();

  const navigateToRecovery = () => {
    navigation.navigate(AuthScreenName.Recovery);
    dispatch(clearAuthError(null));
  };

  return (
    <View
      style={[
        styles.container,
        configApp.android && deviceHeight < 593 && styles.marginAndroid,
      ]}
    >
      <TouchableOpacity style={styles.btn} onPress={navigateToRecovery}>
        <Text style={styles.labelBtn}>Восстановить пароль</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPassword;
