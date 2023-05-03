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
  // @ts-expect-error TS(2307): Cannot find module '~/components' or its correspon... Remove this comment to see the full error message
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
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const { authErrorCode } = useSelector(state => state.auth);

  const [isPhoneAuth, setIsPhoneAuth] = useState(true);
  const [tel, setTel] = useState('');
  const [email, seteMail] = useState('');
  const [password, setPassword] = useState('');
  const [changeCheckBox, setChangeCheckBox] = useState(false);
  const [active, setActive] = useState(false);

  const authRequest = () => {
    // @ts-expect-error TS(2345): Argument of type 'AsyncThunkAction<any, void, Asyn... Remove this comment to see the full error message
    dispatch(fetchUserAuth({ tel, email, password, isPhoneAuth }));
    // @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
    dispatch(clearAuthError());
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('time');
      // @ts-expect-error TS(2345): Argument of type 'string | null' is not assignable... Remove this comment to see the full error message
      dispatch(timeOutAsync(JSON.parse(jsonValue)));
    } catch (e) {
      // error reading value
    }
  };

  const getDataEmail = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('timeEmail');
      // @ts-expect-error TS(2345): Argument of type 'string | null' is not assignable... Remove this comment to see the full error message
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
      // @ts-expect-error TS(2769): No overload matches this call.
      navigation.navigate('ErrorScreen');
    }
  }, [authErrorCode]);

  const OFFSET = 0;

  const focusInput = () => {
    setTimeout(() => {
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      scrollViewRef?.current?.scrollToPosition(0, OFFSET, true);
    }, 200);
  };

  const windowHeight = useWindowDimensions().height;

  const passwordRef = createRef();
  const scrollViewRef = createRef();

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        // @ts-expect-error TS(2769): No overload matches this call.
        ref={scrollViewRef}
        keyboardShouldPersistTaps="handled"
        onKeyboardWillShow={() => {
          if (configApp.android) {
            return;
          }
          setTimeout(() => {
            // @ts-expect-error TS(2571): Object is of type 'unknown'.
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
              // @ts-expect-error TS(2571): Object is of type 'unknown'.
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
