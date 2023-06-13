import { useEffect, useRef, useState } from 'react';
import { Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import { configApp } from '@/constants/platform';
import { useAppDispatch, useAppSelector } from '@/store';
import { useSendPasswordRecoveryCodeMutation } from '@/store/api/auth';
import {
  setIsRecoveryByEmail,
  setIsRecoveryByPhone,
  timeoutAsyncEmail,
  timeoutAsyncPhone,
} from '@/store/slices/auth/actions';
import { selectAuth } from '@/store/slices/auth/selectors';
import { AuthTab, authTabByIndex } from '@/types/authTab';
import { AxiosQueryErrorResponse, Error, ErrorCode } from '@/types/error';
import {
  AuthScreenName,
  CompositeRecoveryConfirmAndEmailNavigationProp,
} from '@/types/navigation';

const OFFSET = 0;
const password = '';

const useRecoveryScreen = () => {
  const [
    sendRecoveryCode,
    { data: timeout, isLoading, isSuccess, isError, error: recoveryError },
  ] = useSendPasswordRecoveryCodeMutation();

  const { timeoutPhone, timeoutEmail, isRecoveryByPhone, isRecoveryByEmail } =
    useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  const navigation =
    useNavigation<CompositeRecoveryConfirmAndEmailNavigationProp>();
  const isFocused = useIsFocused();

  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [activeTab, setActiveTab] = useState<AuthTab>(AuthTab.Phone);
  const [error, setError] = useState<Error | null>(
    (recoveryError as AxiosQueryErrorResponse)?.data
  );
  const scrollViewRef = useRef<KeyboardAwareScrollView>(null);

  const isPhoneAuth = activeTab === AuthTab.Phone;
  const isPhoneError = error?.code === ErrorCode.IncorrectPhone;
  const isEmailError = error?.code === ErrorCode.IncorrectEmail;

  useEffect(() => {
    if (isError) {
      setError((recoveryError as AxiosQueryErrorResponse)?.data);
    }
  }, [isError]);

  useEffect(() => {
    if (phone?.length === 10) {
      Keyboard.dismiss();
    }

    setError(null);
  }, [phone, email]);

  useEffect(() => {
    setPhone('');
    setEmail('');
    setError(null);
  }, [activeTab]);

  useEffect(() => {
    setError(null);
  }, []);

  useEffect(() => {
    setError(null);
  }, [isFocused]);

  useEffect(() => {
    if (isRecoveryByPhone && isPhoneAuth && !isRecoveryByEmail) {
      navigation.navigate(AuthScreenName.RecoveryConfirm, { phone });
      setError(null);
    }
    if (!isPhoneAuth) {
      Keyboard.dismiss();
      navigation.navigate(AuthScreenName.Email);
    }
  }, [isRecoveryByPhone, isRecoveryByEmail]);

  useEffect(() => {
    if (isSuccess) {
      onSendCodeSuccess();
    }
  }, [isSuccess]);

  const onSendCodeSuccess = async () => {
    try {
      const jsonValue = JSON.stringify(timeout);
      await AsyncStorage.setItem(
        isPhoneAuth ? 'timePhone' : 'timeEmail',
        jsonValue
      );
      isPhoneAuth
        ? dispatch(timeoutAsyncPhone(timeout))
        : dispatch(timeoutAsyncEmail(timeout));
      isPhoneAuth
        ? dispatch(setIsRecoveryByPhone())
        : dispatch(setIsRecoveryByEmail());
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

  const switchTab = (index: number) => {
    setError(null);
    setActiveTab(authTabByIndex[index] as AuthTab);
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

  return {
    phone,
    email,
    error,
    onFocus,
    sendCode,
    setPhone,
    setEmail,
    password,
    switchTab,
    isLoading,
    isPhoneAuth,
    timeoutPhone,
    timeoutEmail,
    isPhoneError,
    isEmailError,
    scrollViewRef,
    onKeyboardWillShow,
  };
};

export default useRecoveryScreen;
