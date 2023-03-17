import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Input, TypeSelection } from '~/components';
import ConfrimPreview from '../../../components/auth/ConfirmPreview/ConfirmPreview';
import { HomeScreen, TimerBlock } from '../../../components/auth/Timer/Timer';
import Header from '../../../components/Header/Header';
import Spacer from '../../../components/Spacer/Spacer';
import { recoveryPassword } from '../../../redux/slices/auth/asyncActions';
import { configApp } from '../../../utils/helpers/platform';

import { styles } from './style';

export const RecoveryConfirmationScreen = () => {
  const { isRecovery } = useSelector(state => state.auth);
  const [isPhoneAuth, setIsPhoneAuth] = useState(true);
  const [tel, setTel] = useState('');
  const [email, seteMail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigation = useNavigation();
  console.log('isRecovery', isRecovery);

  const recoveryRequest = async () => {
    await dispatch(recoveryPassword({ tel, email, isPhoneAuth }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header label={'Подтверждение кодом'} />
      <KeyboardAvoidingView
        behavior={configApp.ios ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.wrapperSignIn}>
          <ConfrimPreview />
          <TypeSelection
            setIsPhoneAuth={setIsPhoneAuth}
            isPhoneAuth={isPhoneAuth}
          />
          <Spacer />
          <Input
            isPhoneAuth={isPhoneAuth}
            tel={tel}
            email={email}
            setMail={seteMail}
            setTel={setTel}
          />
          <Spacer size="L" />
          <TimerBlock expiredTimer={25000} />
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
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
