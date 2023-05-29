import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';

import InfoCheckBox from '@/assets/icons/svg/auth/InfoCheckBox';
import Button from '@/components/Button';
import { useAppDispatch } from '@/store';
import {
  clearAuthError,
  clearRecoveryError,
} from '@/store/slices/auth/actions';
import { AuthScreenName, SignInScreenNavigationProp } from '@/types/navigation';

import styles from './style';

const PasswordScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<SignInScreenNavigationProp>();

  const goToSignIn = () => {
    dispatch(clearAuthError(null));
    dispatch(clearRecoveryError());
    navigation.navigate(AuthScreenName.SignIn);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapperSignIn}>
        <View style={styles.containerInfo}>
          <InfoCheckBox />
          <Text style={styles.title}>Пароль успешно изменен</Text>
          <Text style={styles.text}>Теперь вы можете войти в систему</Text>
        </View>
      </View>
      <Button label="Продолжить" onPress={goToSignIn} />
    </SafeAreaView>
  );
};

export default PasswordScreen;
