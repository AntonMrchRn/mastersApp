import React from 'react';
import { Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { useAppDispatch } from '../../../store';
import { clearRecoveryError } from '../../../store/slices/auth/actions';
import {
  AuthScreenName,
  SignInScreenNavigationProp,
} from '../../../types/navigation';
import { Button } from '../../Button';

import { styles } from './style';

const ConfirmPreviewEmail = () => {
  const navigation = useNavigation<SignInScreenNavigationProp>();
  const dispatch = useAppDispatch();

  const onPress = () => {
    dispatch(clearRecoveryError());
    navigation.navigate(AuthScreenName.SignIn);
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.text}>Мы отправили вам письмо</Text>
        <Text style={styles.text}>
          для подтверждения смены пароля. Следуйте инструкциям, указанным
        </Text>
        <Text style={styles.text}>в письме</Text>
      </View>
      <Button onPress={onPress} label="Хорошо, понятно" />
    </View>
  );
};

export default ConfirmPreviewEmail;
