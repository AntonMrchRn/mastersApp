import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '../../../components/Button/Button';
import InfoCheckBox from '../../../assets/icons/svg/auth/InfoCheckBox';
import {
  clearAuthError,
  clearRecoveryError,
} from '../../../redux/slices/auth/reducer';
import { useAppDispatch } from '../../../utils/hooks/useRedux';

import { styles } from './style';

export const PasswordScreen = () => {
  const dispatch = useAppDispatch();
  const navigation: any = useNavigation();

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
          dispatch(clearAuthError(null));
          dispatch(clearRecoveryError());
          navigation.navigate('SignUp');
        }}
      />
    </SafeAreaView>
  );
};
