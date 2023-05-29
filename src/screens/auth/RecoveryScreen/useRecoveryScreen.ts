import { useEffect, useRef, useState } from 'react';
import { Keyboard, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { useIsFocused, useNavigation } from '@react-navigation/native';

import { configApp } from '@/constants/platform';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  clearAuthError,
  clearRecoveryError,
} from '@/store/slices/auth/actions';
import { recoveryPassword } from '@/store/slices/auth/asyncActions';
import { selectAuth } from '@/store/slices/auth/selectors';
import {
  AuthScreenName,
  CompositeRecoveryConfirmAndEmailNavigationProp,
} from '@/types/navigation';

const OFFSET = 0;
const password = '';

const useRecoveryScreen = () => {
  const { isRecovery, timeout, timeOutEmail, isRecoveryEmail } =
    useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  const navigation =
    useNavigation<CompositeRecoveryConfirmAndEmailNavigationProp>();
  const isFocused = useIsFocused();

  const [tel, setTel] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPhoneAuth, setIsPhoneAuth] = useState<boolean>(true);
  const passwordRef = useRef<TextInput>(null);
  const scrollViewRef = useRef<KeyboardAwareScrollView>(null);

  useEffect(() => {
    dispatch(clearRecoveryError());
    dispatch(clearAuthError(null));
  }, []);

  useEffect(() => {
    dispatch(clearRecoveryError());
    dispatch(clearAuthError(null));
  }, [isFocused]);

  useEffect(() => {
    if (isRecovery && isPhoneAuth && !isRecoveryEmail) {
      navigation.navigate(AuthScreenName.RecoveryConfirm, { tel: tel });
      dispatch(clearRecoveryError());
    }
    if (!isPhoneAuth) {
      Keyboard.dismiss();
      navigation.navigate(AuthScreenName.Email);
    }
  }, [isRecovery, isRecoveryEmail]);

  useEffect(() => {
    if (tel?.length === 10) {
      Keyboard.dismiss();
    }
  }, [tel]);

  const recoveryRequest = async () => {
    await dispatch(
      recoveryPassword({
        phoneNumber: '7' + tel,
        email,
        password,
        isPhoneAuth,
      })
    );
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
    timeout,
    setEmail,
    password,
    isActive,
    focusInput,
    setIsActive,
    isPhoneAuth,
    passwordRef,
    timeOutEmail,
    scrollViewRef,
    setIsPhoneAuth,
    recoveryRequest,
    onKeyboardWillShow,
  };
};

export default useRecoveryScreen;
