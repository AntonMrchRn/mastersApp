import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Button, KeyboardAvoidingView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import { InputPassword } from '~/components';
import { ButtonAuth } from '../../../components/auth/buttonAuth';
import CodeFieldInput from '../../../components/auth/CodeField/CodeField';
import ConfrimPreview from '../../../components/auth/ConfirmPreview/ConfirmPreview';
import { TimerBlock } from '../../../components/auth/Timer/Timer';
import Header from '../../../components/Header/Header';
import Spacer from '../../../components/Spacer/Spacer';
import {
  recoveryPassword,
  restorePassword,
} from '../../../redux/slices/auth/asyncActions';
import { clearRecoveryError } from '../../../redux/slices/auth/reducer';
import { configApp } from '../../../utils/helpers/platform';

import { styles } from './style';

export const RecoveryConfirmationScreen = ({
  route: {
    params: { tel },
  },
}) => {
  const { isRecovery, timeout, recoveryError } = useSelector(
    state => state.auth
  );
  const [isPhoneAuth, setIsPhoneAuth] = useState(true);
  const [email, seteMail] = useState('');
  const [value, setValue] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const recoveryRequest = async () => {
    await dispatch(restorePassword({ password, value })).then(v => {
      if (v.payload === null) {
        dispatch(clearRecoveryError());
        navigation.navigate('SignUpScreen');
      }
    });
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
          <Spacer />
          <CodeFieldInput value={value} setValue={setValue} />
          <InputPassword password={password} setPassword={setPassword} />
          <Spacer size="L" />
          {recoveryError?.message?.length > 0 && (
            <Text style={styles.error}>{recoveryError?.message}</Text>
          )}
          <ButtonAuth
            isPhoneAuth={isPhoneAuth}
            tel={tel}
            password={password}
            email={email}
            label="Подтвердить"
            isDisabled
            withOutPassword
            onPress={() => recoveryRequest()}
          />
          <TimerBlock
            expiredTimer={Number(`${timeout?.timeout}000`)}
            isConfirm
            callBack={() => recoveryRequest()}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
