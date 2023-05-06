import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { TextInput, useWindowDimensions, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ForgotPassword,
  Input,
  InputPassword,
  TypeSelection,
} from '../../../components';
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
import { useAppDispatch, useAppSelector } from '../../../utils/hooks/useRedux';

import { styles } from './style';

export const SignUpScreen = () => {
  const dispatch = useAppDispatch();
  const navigation: any = useNavigation();
  const { authErrorCode } = useAppSelector((state: any) => state.auth);

  const [isPhoneAuth, setIsPhoneAuth] = useState(true);
  const [tel, setTel] = useState('');
  const [email, seteMail] = useState('');
  const [password, setPassword] = useState('');
  const [changeCheckBox, setChangeCheckBox] = useState(false);
  const [active, setActive] = useState(false);

  const authRequest = () => {
    dispatch(fetchUserAuth({ tel, email, password, isPhoneAuth }));
    dispatch(clearAuthError(null));
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('time');
      jsonValue && dispatch(timeOutAsync(JSON.parse(jsonValue)));
    } catch (e) {
      // error reading value
    }
  };

  const getDataEmail = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('timeEmail');
      jsonValue && dispatch(timeOutAsyncEmail(JSON.parse(jsonValue)));
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
      navigation.navigate('Error');
    }
  }, [authErrorCode]);

  const OFFSET = 0;

  const focusInput = () => {
    setTimeout(() => {
      scrollViewRef?.current?.scrollToPosition(0, OFFSET, true);
    }, 200);
  };

  const windowHeight = useWindowDimensions().height;

  const passwordRef = useRef<TextInput>(null);
  const scrollViewRef = useRef<KeyboardAwareScrollView>(null);

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
              configApp.android && windowHeight < 593 && styles.androidHeight,
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
              configApp.android &&
                windowHeight < 593 &&
                styles.marginTopAndroid,
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
