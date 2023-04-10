import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Keyboard, View } from 'react-native';
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
import { BtnCloseKeyboard } from '../../../components/CloseKeyboard';
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
  const [scrollHeight, setScrollHeight] = useState(215);
  const [onKey, setOnKey] = useState(false);
  const [keyActive, setKeyActive] = useState(false);

  const authRequest = () => {
    dispatch(fetchUserAuth({ tel, email, password, isPhoneAuth }));
    dispatch(clearAuthError());
  };

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setOnKey(true);
    });

    Keyboard.addListener('keyboardWillHide', () => {
      setOnKey(false);
    });
    return () => {
      Keyboard.removeAllListeners('keyboardDidShow');
    };
  });

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

  const scrollRef = useRef(null);

  const SCREEN_HEIGHT = Dimensions.get('screen').height;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        ref={scrollRef}
        behavior="position"
        contentContainerStyle={styles.containerKeyBoard}
        extraScrollHeight={configApp.ios ? scrollHeight : 200}
        scrollEnabled={false}
        onKeyboardDidShow={() => {
          configApp.android &&
            scrollRef.current.scrollForExtraHeightOnAndroid(75);
        }}
        onKeyboardDidChangeFrame={() => {
          setScrollHeight(215);
        }}
        keyboardVerticalOffset={0}
        pagingEnabled={false}
        style={{ height: SCREEN_HEIGHT }}
        enableOnAndroid={true}
        keyboardOpeningTime={300}
        extraHeight={75}
        viewIsInsideTabBar={false}
      >
        <View style={styles.wrapperSignIn}>
          <View style={styles.wrapperSignInContainer}>
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
              setScrollHeight={setScrollHeight}
              setKeyActive={setKeyActive}
            />
            <InputPassword
              password={password}
              setPassword={setPassword}
              setScrollHeight={setScrollHeight}
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
          {configApp.ios && onKey && keyActive && (
            <BtnCloseKeyboard
              scrollHeight={authError ? 172 : 145}
              onPress={() => Keyboard.dismiss()}
            />
          )}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
