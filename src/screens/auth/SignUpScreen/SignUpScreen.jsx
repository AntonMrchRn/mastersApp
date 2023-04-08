import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Keyboard, View } from 'react-native';
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
import ModalComponentScreen from '../../../components/auth/ModalComponentAuth';
import { BtnCloseKeyboard } from '../../../components/CloseKeyboard';
import Logo from '../../../components/svg/auth/Logo';

import { fetchUserAuth } from '../../../redux/slices/auth/asyncActions';
import {
  clearAuthError,
  modalVisible,
  timeOutAsync,
  timeOutAsyncEmail,
} from '../../../redux/slices/auth/reducer';

import { styles } from './style';

export const SignUpScreen = () => {
  const { authError, visible } = useSelector(state => state.auth);
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

  const closeModal = () => {
    dispatch(modalVisible(false));
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

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        behavior={'position'}
        contentContainerStyle={styles.containerKeyBoard}
        extraScrollHeight={scrollHeight}
        scrollEnabled={false}
        keyboardVerticalOffset={0}
        pagingEnabled={true}
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
            <ModalComponentScreen
              flag={true}
              visible={visible}
              label="Вы успешно поменяли пароль!"
              textBtn="Готово"
              onPress={closeModal}
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
          {onKey && keyActive && (
            <BtnCloseKeyboard
              scrollHeight={96}
              onPress={() => Keyboard.dismiss()}
            />
          )}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
