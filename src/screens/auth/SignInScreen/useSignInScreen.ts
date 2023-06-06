import { useEffect, useRef, useState } from 'react';
import { TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import { configApp } from '@/constants/platform';
import { storageMMKV } from '@/mmkv/storage';
import { useAppDispatch } from '@/store';
import { useGetUserAuthMutation } from '@/store/api/auth';
import {
  login,
  timeoutAsyncEmail,
  timeoutAsyncPhone,
} from '@/store/slices/auth/actions';
import { AuthTab, authTabByIndex } from '@/types/authTab';
import { AxiosQueryErrorResponse, ErrorCode } from '@/types/error';
import { Error } from '@/types/error';
import { AuthScreenName, ErrorScreenNavigationProp } from '@/types/navigation';

const OFFSET = 0;

const useSignInScreen = () => {
  const [
    getUserAuth,
    { data: userAuth, isSuccess, isLoading, isError, error: authError },
  ] = useGetUserAuthMutation();

  const isFocused = useIsFocused();
  const dispatch = useAppDispatch();
  const navigation = useNavigation<ErrorScreenNavigationProp>();

  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [activeTab, setActiveTab] = useState<AuthTab>(AuthTab.Phone);
  const [isAgreeWithTerms, setIsAgreeWithTerms] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(
    (authError as AxiosQueryErrorResponse)?.data
  );
  const passwordRef = useRef<TextInput>(null);
  const scrollViewRef = useRef<KeyboardAwareScrollView>(null);

  const isPhoneAuth = activeTab === AuthTab.Phone;
  const isPhoneError = error?.code === ErrorCode.IncorrectPhone;
  const isEmailError = error?.code === ErrorCode.IncorrectEmail;
  const isPasswordError = error?.code === ErrorCode.IncorrectPassword;

  useEffect(() => {
    if (isError) {
      if (error?.code === ErrorCode.Server) {
        return navigation.navigate(AuthScreenName.Error);
      }

      setError((authError as AxiosQueryErrorResponse)?.data);
    }
  }, [isError]);

  useEffect(() => {
    setPhone('');
    setEmail('');
    setError(null);
  }, [activeTab]);

  useEffect(() => {
    if (isPasswordError) {
      setError(null);
    }
  }, [password]);

  useEffect(() => {
    getData();
    setError(null);
  }, []);

  useEffect(() => {
    setError(null);
  }, [isFocused]);

  useEffect(() => {
    if (phone?.length === 10) {
      passwordRef.current?.focus();
    }

    setError(null);
  }, [phone, email]);

  useEffect(() => {
    if (isSuccess && userAuth) {
      storageMMKV.set('token', userAuth.token);
      dispatch(login());
      setError(null);
    }
  }, [isSuccess]);

  const logIn = async () => {
    await getUserAuth({
      login: isPhoneAuth ? '7' + phone : email,
      password,
    });
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('timePhone');
      const jsonValueEmail = await AsyncStorage.getItem('timeEmail');

      jsonValue && dispatch(timeoutAsyncPhone(JSON.parse(jsonValue)));
      jsonValueEmail && dispatch(timeoutAsyncEmail(JSON.parse(jsonValueEmail)));
    } catch (e) {
      console.log(`getData value reading error: ${e}`);
    }
  };

  const onFocus = () => {
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

  const switchTab = (index: number) => {
    setError(null);
    setActiveTab(authTabByIndex[index] as AuthTab);
  };

  return {
    phone,
    email,
    logIn,
    error,
    onFocus,
    setPhone,
    setEmail,
    password,
    switchTab,
    isLoading,
    setPassword,
    passwordRef,
    isPhoneAuth,
    isPhoneError,
    isEmailError,
    scrollViewRef,
    isPasswordError,
    isAgreeWithTerms,
    onKeyboardWillShow,
    setIsAgreeWithTerms,
  };
};

export default useSignInScreen;
