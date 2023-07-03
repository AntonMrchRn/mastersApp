import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { configApp, deviceHeight } from '@/constants/platform';
import { AppScreenName } from '@/navigation/AppNavigation';
import { RecoveryScreenNavigationProp } from '@/types/navigation';

import styles from './style';

const ForgotPassword = () => {
  const navigation = useNavigation<RecoveryScreenNavigationProp>();

  const navigateToRecovery = () => {
    navigation.navigate(AppScreenName.Recovery);
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
