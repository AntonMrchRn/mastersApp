import React, { useState } from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

import {
  Button,
  ErrorField,
  ForgotPassword,
  Input,
  InputPassword,
  Logo,
  TypeSelection,
} from '~/components';

import { configApp } from '../../../utils/helpers/platform';

import { styles } from './style';

const SignUpScreen = () => {
  const { authError } = useSelector(state => state.auth);

  const [isPhoneAuth, setIsPhoneAuth] = useState(true);
  const [tel, setTel] = useState('');
  const [email, seteMail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={configApp.ios ? 'padding' : 'height'}
        style={styles.container}
      >
        <Logo />
        <View style={styles.wrapperSignIn}>
          <TypeSelection
            setIsPhoneAuth={setIsPhoneAuth}
            isPhoneAuth={isPhoneAuth}
          />
          <Input
            isPhoneAuth={isPhoneAuth}
            tel={tel}
            email={email}
            setMail={seteMail}
            setTel={setTel}
          />
          <InputPassword password={password} setPassword={setPassword} />
          {authError && <ErrorField error={authError} />}
          <ForgotPassword />
          <Button
            isPhoneAuth={isPhoneAuth}
            tel={tel}
            password={password}
            email={email}
            isDisabled
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUpScreen;
