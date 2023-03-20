import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Input, TypeSelection } from '~/components';
import ForgotPreview from '../../../components/auth/ForgotPreview/ForgotPreview';
import { TimerBlock } from '../../../components/auth/Timer/Timer';
import Header from '../../../components/Header/Header';
import ModalScreen from '../../../components/ModalScreen';
import Spacer from '../../../components/Spacer/Spacer';
import { storageMMKV } from '../../../mmkv/storage';
import { recoveryPassword } from '../../../redux/slices/auth/asyncActions';
import { clearRecoveryError, logOut } from '../../../redux/slices/auth/reducer';
import { configApp } from '../../../utils/helpers/platform';

import { styles } from './style';

export const RecoveryScreen = () => {
  const { isRecovery, timeout, recoveryError } = useSelector(
    state => state.auth
  );
  const [isPhoneAuth, setIsPhoneAuth] = useState(true);
  const [tel, setTel] = useState('');
  const [email, seteMail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const recoveryRequest = async () => {
    await dispatch(recoveryPassword({ tel, email, isPhoneAuth }));
  };

  const closeModal = () => {
    setVisible(false);
    dispatch(clearRecoveryError());
    navigation.navigate('SignUpScreen');
  };

  useEffect(() => {
    if (isRecovery && isPhoneAuth) {
      navigation.navigate('RecoveryConfirmScreen', { tel: tel });
      dispatch(clearRecoveryError());
    }
    if (!isPhoneAuth) {
      setVisible(true);
    }
  }, [isRecovery]);

  return (
    <SafeAreaView style={styles.container}>
      <Header label={'Восстановление пароля'} />
      <KeyboardAvoidingView
        behavior={configApp.ios ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.wrapperSignIn}>
          <ForgotPreview />
          <TypeSelection
            setIsPhoneAuth={setIsPhoneAuth}
            isPhoneAuth={isPhoneAuth}
          />
          <ModalScreen visible={visible}>
            <Text style={styles.titleInfo}>
              Восстановление пароля На ваш Email отправлено письмо для
              подтверждения смены пароля. Следуйте инструкциям в письме.
            </Text>
            <View style={styles.containerBtn}>
              <TouchableOpacity
                style={styles.btnClose}
                onPress={() => closeModal()}
              >
                <Text style={styles.textBtn}>Перейти на главную</Text>
              </TouchableOpacity>
            </View>
          </ModalScreen>
          <Spacer />
          <Input
            isPhoneAuth={isPhoneAuth}
            tel={tel}
            email={email}
            setMail={seteMail}
            setTel={setTel}
          />
          {recoveryError?.message?.length > 0 && (
            <Text style={styles.error}>{recoveryError?.message}</Text>
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
