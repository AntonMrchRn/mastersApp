import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ForgotPassword from '../../../components/auth/ForgotPassword';

import Input from '../../../components/auth/Input';
import InputPassword from '../../../components/auth/Input/password';
import Logo from '../../../components/auth/Logo';
import TypeSelection from '../../../components/auth/TypeSelection';
import Button from '../../../components/Button';
import { configApp } from '../../../helpers/platform';

import { styles } from './style';

const SignUpScreen = () => {
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
