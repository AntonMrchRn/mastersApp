import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { createRef, useEffect, useState } from 'react';
import { useWindowDimensions, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import normalize from 'react-native-normalize';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import {
  ForgotPassword,
  Input,
  InputPassword,
  TypeSelection,
} from '~/components';
import { ButtonAuth } from '../../../components/auth/ButtonAuth/ButtonAuth';
import CheckBoxAgreement from '../../../components/auth/CheckBox';
import LogoPreview from '../../../components/auth/LogoPreview';
import { fetchUserAuth } from '../../../redux/slices/auth/asyncActions';
import {
  clearAuthError,
  timeOutAsync,
  timeOutAsyncEmail,
} from '../../../redux/slices/auth/reducer';
import { configApp } from '../../../utils/helpers/platform';

import { styles } from './style';

export const SignUpScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { authErrorCode } = useSelector(state => state.auth);

  const [isPhoneAuth, setIsPhoneAuth] = useState(true);
  const [tel, setTel] = useState('');
  const [email, seteMail] = useState('');
  const [password, setPassword] = useState('');
  const [changeCheckBox, setChangeCheckBox] = useState(false);
  const [active, setActive] = useState(false);

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

  useEffect(() => {
    if (authErrorCode === 20001) {
      navigation.navigate('ErrorScreen');
    }
  }, [authErrorCode]);

  const OFFSET = 0;

  const focusInput = () => {
    setTimeout(() => {
      scrollViewRef?.current?.scrollToPosition(0, OFFSET, true);
    }, 200);
  };

  const windowHeight = useWindowDimensions().height;

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
        enableOnAndroid={true}
      >
        <View style={styles.wrapperSignIn}>
          <LogoPreview
            label={'Войдите в систему'}
            height={configApp.android && windowHeight < 593 ? 145 : 165}
          />
          <View
            style={[
              styles.wrapperCenter,
              configApp.android &&
                windowHeight < 593 && { height: normalize(255, 'height') },
            ]}
          >
            <TypeSelection
              setIsPhoneAuth={setIsPhoneAuth}
              isPhoneAuth={isPhoneAuth}
              setTel={setTel}
              seteMail={seteMail}
              setActive={setActive}
            />
            <Input
              isPhoneAuth={isPhoneAuth}
              tel={tel}
              email={email}
              setMail={seteMail}
              setTel={setTel}
              onSubmitEditing={() => passwordRef?.current?.focus()}
              onFocus={configApp.ios ? focusInput : () => {}}
              setActive={setActive}
              active={active}
            />
            <InputPassword
              password={password}
              setPassword={setPassword}
              innerRef={passwordRef}
            />
            <CheckBoxAgreement
              valueCheckBox={changeCheckBox}
              setChangeCheckBox={setChangeCheckBox}
            />
          </View>
          <View
            style={[
              styles.bottomWrapper,
              configApp.android && windowHeight < 593 && { marginTop: 16 },
            ]}
          >
            <ButtonAuth
              flag={true}
              isPhoneAuth={isPhoneAuth}
              tel={tel}
              password={password}
              email={email}
              isDisabled
              onPress={authRequest}
              valueCheckBox={changeCheckBox}
              label={'Продолжить'}
            />
            <ForgotPassword />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
