import { useEffect, useRef, useState } from 'react';
import { TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import { configApp } from '@/constants/platform';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  useRestorePasswordMutation,
  useSendPasswordRecoveryCodeMutation,
} from '@/store/api/auth';
import {
  setIsRecoveryByPhone,
  timeoutAsyncPhone,
} from '@/store/slices/auth/actions';
import { selectAuth } from '@/store/slices/auth/selectors';
import { AxiosQueryErrorResponse, Error, ErrorCode } from '@/types/error';
import {
  AuthScreenName,
  PasswordScreenNavigationProp,
  RecoveryConfirmScreenRoute,
} from '@/types/navigation';

const OFFSET = 0;
const email = '';
const isPhoneAuth = true;

const useRecoveryConfirmationScreen = () => {
  const [sendRecoveryCode, { data: timeout, isSuccess: isCodeSuccess }] =
    useSendPasswordRecoveryCodeMutation();
  const [
    restoreUserPassword,
    {
      data,
      isError,
      isLoading,
      isSuccess: isPasswordSuccess,
      error: recoveryPasswordError,
    },
  ] = useRestorePasswordMutation();

  const { timeoutPhone } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  const isFocused = useIsFocused();
  const route = useRoute<RecoveryConfirmScreenRoute>();
  const navigation = useNavigation<PasswordScreenNavigationProp>();

  const [code, setCode] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<Error | null>(
    (recoveryPasswordError as AxiosQueryErrorResponse)?.data
  );
  const passwordRef = useRef<TextInput>(null);
  const scrollViewRef = useRef<KeyboardAwareScrollView>(null);

  const phone = route.params.phone;
  const isPasswordError = error?.code === ErrorCode.IncorrectPassword;
  const isCodeError = error?.code === ErrorCode.IncorrectVerificationCode;

  useEffect(() => {
    setError(null);
  }, []);

  useEffect(() => {
    setError(null);
  }, [isFocused]);

  useEffect(() => {
    if (isPasswordSuccess) {
      onRestorePasswordSuccess();
    }
  }, [isPasswordSuccess]);

  useEffect(() => {
    if (isCodeSuccess) {
      onSendCodeSuccess();
    }
  }, [isCodeSuccess]);

  useEffect(() => {
    if (isError) {
      setError((recoveryPasswordError as AxiosQueryErrorResponse)?.data);
    }
  }, [isError]);

  useEffect(() => {
    if (isError && isPasswordError) {
      setError(null);
    }
  }, [password]);

  useEffect(() => {
    if (code?.length === 6) {
      passwordRef?.current?.focus();
    }

    if (isError && isCodeError) {
      setError(null);
    }
  }, [code]);

  const onRestorePasswordSuccess = async () => {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem('timePhone', jsonValue);

      if (data === null || data === undefined) {
        setError(null);
        navigation.navigate(AuthScreenName.Password);
      }
    } catch (e) {
      console.log(`onRestorePasswordSuccess error: ${e}`);
    }
  };

  const onSendCodeSuccess = async () => {
    try {
      const jsonValue = JSON.stringify(timeout);
      await AsyncStorage.setItem('timePhone', jsonValue);
      await dispatch(timeoutAsyncPhone(timeout));
      dispatch(setIsRecoveryByPhone());
    } catch (e) {
      console.log(`onSendCodeSuccess error: ${e}`);
    }
  };

  const sendCode = async () => {
    await sendRecoveryCode({
      phoneNumber: '7' + phone,
      email,
      password,
      isPhoneAuth,
    });
  };

  const restorePassword = async () => {
    await restoreUserPassword({
      code,
      password,
    });
  };

  const onFocus = () => {
    setTimeout(() => {
      scrollViewRef?.current?.scrollToPosition(0, OFFSET, true);
    }, 0);
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
    code,
    email,
    error,
    setCode,
    onFocus,
    password,
    sendCode,
    isLoading,
    setPassword,
    isCodeError,
    passwordRef,
    timeoutPhone,
    scrollViewRef,
    restorePassword,
    isPasswordError,
    onKeyboardWillShow,
  };
};

export default useRecoveryConfirmationScreen;
