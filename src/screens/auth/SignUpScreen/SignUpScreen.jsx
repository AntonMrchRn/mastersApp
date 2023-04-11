import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createRef, useEffect, useRef, useState } from 'react';
import { Dimensions, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import {
  Button,
  ErrorField,
  ForgotPassword,
  Input,
  InputPassword,
  TypeSelection,
} from '~/components';
import CheckBoxAgreement from '../../../components/auth/CheckBox';
import Logo from '../../../components/svg/auth/Logo';

import { fetchUserAuth } from '../../../redux/slices/auth/asyncActions';
import {
  clearAuthError,
  timeOutAsync,
  timeOutAsyncEmail,
} from '../../../redux/slices/auth/reducer';
import { configApp } from '../../../utils/helpers/platform';

import { styles } from './style';

export const SignUpScreen = () => {
  const { authError } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const [isPhoneAuth, setIsPhoneAuth] = useState(true);
  const [tel, setTel] = useState('');
  const [email, seteMail] = useState('');
  const [password, setPassword] = useState('');
  const [changeCheckBox, setChangeCheckBox] = useState(false);

  const authRequest = () => {
    dispatch(fetchUserAuth({ tel, email, password, isPhoneAuth }));
    dispatch(clearAuthError());
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('time');
      dispatch(timeOutAsync(JSON.parse(jsonValue)));
    } catch (e) {
      // error reading value
    }
  };

  const getDataEmail = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('timeEmail');
      dispatch(timeOutAsyncEmail(JSON.parse(jsonValue)));
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    getData();
    getDataEmail();
  }, []);

  const OFFSET = 145;

  const focusInput = () => {
    setTimeout(() => {
      scrollViewRef?.current?.scrollToPosition(0, OFFSET, true);
    }, 200);
  };

  const passwordRef = createRef();
  const scrollViewRef = createRef();

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        ref={scrollViewRef}
        keyboardShouldPersistTaps="handled"
        onKeyboardWillShow={() => {
          if (configApp.android) {
            return;
          }
          setTimeout(() => {
            scrollViewRef?.current?.scrollToPosition(0, OFFSET, true);
          }, 200);
        }}
        keyboardOpeningTime={100}
        contentContainerStyle={styles.containerKeyboard}
        enableOnAndroid={true}
      >
        <View style={styles.wrapperSignIn}>
          <Logo />
          <TypeSelection
            setIsPhoneAuth={setIsPhoneAuth}
            isPhoneAuth={isPhoneAuth}
            setTel={setTel}
            seteMail={seteMail}
          />
          <Input
            isPhoneAuth={isPhoneAuth}
            tel={tel}
            email={email}
            setMail={seteMail}
            setTel={setTel}
            onSubmitEditing={() => passwordRef?.current?.focus()}
            onFocus={configApp.ios ? focusInput : () => {}}
          />
          <InputPassword
            password={password}
            setPassword={setPassword}
            innerRef={passwordRef}
          />
          {authError && <ErrorField error={authError} />}
          <CheckBoxAgreement
            valueCheckBox={changeCheckBox}
            setChangeCheckBox={setChangeCheckBox}
          />
          <ForgotPassword />
          <Button
            flag={true}
            isPhoneAuth={isPhoneAuth}
            tel={tel}
            password={password}
            email={email}
            isDisabled
            onPress={authRequest}
            valueCheckBox={changeCheckBox}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
