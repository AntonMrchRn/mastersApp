import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import {
  Button,
  ErrorField,
  ForgotPassword,
  Input,
  InputPassword,
  Logo,
  TypeSelection,
} from '~/components';
import ModalScreen from '../../../components/ModalScreen';

import { fetchUserAuth } from '../../../redux/slices/auth/asyncActions';
import { modalVisible } from '../../../redux/slices/auth/reducer';
import { configApp } from '../../../utils/helpers/platform';

import { styles } from './style';

export const SignUpScreen = () => {
  const { authError, visible } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const [isPhoneAuth, setIsPhoneAuth] = useState(true);
  const [tel, setTel] = useState('');
  const [email, seteMail] = useState('');
  const [password, setPassword] = useState('');

  const authRequest = () =>
    dispatch(fetchUserAuth({ tel, email, password, isPhoneAuth }));

  const closeModal = () => {
    dispatch(modalVisible(false));
  };

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
          <ModalScreen visible={visible}>
            <Text style={styles.titleInfo}>Вы успешно поменяли пароль!</Text>
            <View style={styles.containerBtn}>
              <TouchableOpacity style={styles.btnClose} onPress={closeModal}>
                <Text style={styles.textBtn}>Готово</Text>
              </TouchableOpacity>
            </View>
          </ModalScreen>
          <InputPassword password={password} setPassword={setPassword} />
          {authError && <ErrorField error={authError} />}
          <ForgotPassword />
          <Button
            isPhoneAuth={isPhoneAuth}
            tel={tel}
            password={password}
            email={email}
            isDisabled
            onPress={authRequest}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
