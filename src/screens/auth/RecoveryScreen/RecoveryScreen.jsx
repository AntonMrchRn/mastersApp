import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Input, TypeSelection } from '~/components';
import ForgotPreview from '../../../components/auth/ForgotPreview/ForgotPreview';
import ModalComponentScreen from '../../../components/auth/ModalComponentAuth';
import { TimerBlock } from '../../../components/auth/Timer/Timer';
import Header from '../../../components/Header/Header';
import Spacer from '../../../components/Spacer/Spacer';
import { storageMMKV } from '../../../mmkv/storage';
import { recoveryPassword } from '../../../redux/slices/auth/asyncActions';
import {
  clearRecoveryError,
  modalVisibleEmail,
} from '../../../redux/slices/auth/reducer';
import { configApp } from '../../../utils/helpers/platform';

import { styles } from './style';

export const RecoveryScreen = () => {
  const { isRecovery, timeout, recoveryError, visibleEmail } = useSelector(
    state => state.auth
  );
  const [isPhoneAuth, setIsPhoneAuth] = useState(true);
  const [tel, setTel] = useState('');
  const [email, seteMail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const recoveryRequest = async () => {
    await dispatch(recoveryPassword({ tel, email, isPhoneAuth }));
  };

  useEffect(() => {
    dispatch(clearRecoveryError());
  }, []);

  const closeModal = () => {
    dispatch(modalVisibleEmail(false));
    dispatch(clearRecoveryError());
    navigation.navigate('SignUpScreen');
  };

  const goBack = () => {
    dispatch(clearRecoveryError());
    navigation.goBack();
  };

  useEffect(() => {
    if (isRecovery && isPhoneAuth) {
      navigation.navigate('RecoveryConfirmScreen', { tel: tel });
      dispatch(clearRecoveryError());
    }
    if (!isPhoneAuth) {
      dispatch(modalVisibleEmail(true));
    }
  }, [isRecovery]);

  return (
    <SafeAreaView style={styles.container}>
      <Header label={'Восстановление пароля'} callBack={goBack} />
      <KeyboardAvoidingView
        behavior={configApp.ios ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.wrapperSignIn}>
          <ForgotPreview />
          <TypeSelection
            setIsPhoneAuth={setIsPhoneAuth}
            isPhoneAuth={isPhoneAuth}
            setTel={setTel}
            seteMail={seteMail}
          />
          <ModalComponentScreen
            visible={visibleEmail}
            navigation={navigation}
            label="На ваш Email отправлено письмо для
              подтверждения смены пароля. Следуйте инструкциям в письме."
            textBtn="Перейти на главную"
            onPress={closeModal}
          />
          <Spacer />
          <Input
            isPhoneAuth={isPhoneAuth}
            tel={tel}
            email={email}
            setMail={seteMail}
            setTel={setTel}
          />
          {recoveryError?.message?.length > 0 && (
            <View style={styles.containerError}>
              <Text style={styles.error}>{recoveryError?.message}</Text>
            </View>
          )}
          <Spacer size="L" />
          <Button
            isPhoneAuth={isPhoneAuth}
            tel={tel}
            password={password}
            email={email}
            label="Продолжить"
            isDisabled
            withOutPassword
            onPress={recoveryRequest}
          />
          <TimerBlock expiredTimer={Number(`${timeout?.timeout}000`)} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
