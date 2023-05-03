import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';

import { Button } from '../../../components/Button/Button';
import InfoCheckBox from '../../../components/svg/auth/InfoCheckBox';
import {
  clearAuthError,
  clearRecoveryError,
} from '../../../redux/slices/auth/reducer';

import { styles } from './style';

export const PasswordScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapperSignIn}>
        <View style={styles.containerInfo}>
          <InfoCheckBox />
          <Text style={styles.title}>Пароль успешно изменен</Text>
          <Text style={styles.text}>Теперь вы можете войти в систему</Text>
        </View>
      </View>
      <Button
        label="Продолжить"
        onPress={() => {
          // @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
          dispatch(clearAuthError());
          dispatch(clearRecoveryError());
          // @ts-expect-error TS(2769): No overload matches this call.
          navigation.navigate('SignUpScreen');
        }}
      />
    </SafeAreaView>
  );
};
