import { useEffect, useRef, useState } from 'react';
import { TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import { configApp } from '@/constants/platform';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  clearAuthError,
  clearRecoveryError,
  timeOutAsync,
  timeOutAsyncEmail,
} from '@/store/slices/auth/actions';
import { fetchUserAuth } from '@/store/slices/auth/asyncActions';
import { selectAuth } from '@/store/slices/auth/selectors';
import { ErrorCode } from '@/types/error';
import { AuthScreenName, ErrorScreenNavigationProp } from '@/types/navigation';

const OFFSET = 0;

const useSignInScreen = () => {
  const { authErrorCode } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  const isFocused = useIsFocused();
  const navigation = useNavigation<ErrorScreenNavigationProp>();

  const [isPhoneAuth, setIsPhoneAuth] = useState<boolean>(true);
  const [tel, setTel] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isAgreeWithTerms, setIsAgreeWithTerms] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const passwordRef = useRef<TextInput>(null);
  const scrollViewRef = useRef<KeyboardAwareScrollView>(null);

  useEffect(() => {
    getData();
    getDataEmail();
    dispatch(clearRecoveryError());
    dispatch(clearAuthError(null));
  }, []);

  useEffect(() => {
    dispatch(clearRecoveryError());
    dispatch(clearAuthError(null));
  }, [isFocused]);

  useEffect(() => {
    if (authErrorCode === ErrorCode.Server) {
      navigation.navigate(AuthScreenName.Error);
    }
  }, [authErrorCode]);

  const authRequest = () => {
    dispatch(
      fetchUserAuth({ phoneNumber: '7' + tel, email, password, isPhoneAuth })
    );
    dispatch(clearAuthError(null));
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('time');
      jsonValue && dispatch(timeOutAsync(JSON.parse(jsonValue)));
    } catch (e) {
      console.log(`getData value reading error: ${e}`);
    }
  };

  const getDataEmail = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('timeEmail');
      jsonValue && dispatch(timeOutAsyncEmail(JSON.parse(jsonValue)));
    } catch (e) {
      console.log(`getDataEmail value reading error: ${e}`);
    }
  };

  const focusInput = () => {
    setTimeout(() => {
      scrollViewRef?.current?.scrollToPosition(0, OFFSET, true);
    }, 200);
  };

  const onKeyboardWillShow = () => {
    if (configApp.android) {
      return;
    }
    setTimeout(() => {
      scrollViewRef?.current?.scrollToPosition(0, OFFSET, true);
    }, 200);
  };

  return {
    tel,
    email,
    setTel,
    setEmail,
    isActive,
    password,
    focusInput,
    authRequest,
    isPhoneAuth,
    setIsActive,
    setPassword,
    passwordRef,
    scrollViewRef,
    setIsPhoneAuth,
    isAgreeWithTerms,
    onKeyboardWillShow,
    setIsAgreeWithTerms,
  };
};

export default useSignInScreen;
