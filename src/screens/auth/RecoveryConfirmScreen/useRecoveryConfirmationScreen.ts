import { useEffect, useRef, useState } from 'react';
import { TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import { useAppDispatch, useAppSelector } from '../../../store';
import {
  clearAuthError,
  clearRecoveryError,
} from '../../../store/slices/auth/actions';
import {
  recoveryPassword,
  restorePassword,
} from '../../../store/slices/auth/asyncActions';
import { selectAuth } from '../../../store/slices/auth/selectors';
import {
  AuthScreenName,
  PasswordScreenNavigationProp,
  RecoveryConfirmScreenRoute,
} from '../../../types/navigation';
import { configApp } from '../../../utils/helpers/platform';

const OFFSET = 0;
const email = '';
const isPhoneAuth = true;

const useRecoveryConfirmationScreen = () => {
  const { timeout, recoveryError } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  const isFocused = useIsFocused();
  const route = useRoute<RecoveryConfirmScreenRoute>();
  const navigation = useNavigation<PasswordScreenNavigationProp>();

  const [value, setValue] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const passwordRef = useRef<TextInput>(null);
  const scrollViewRef = useRef<KeyboardAwareScrollView>(null);
  const tel = route.params.tel;

  useEffect(() => {
    dispatch(clearRecoveryError());
    dispatch(clearAuthError(null));
  }, [isFocused]);

  useEffect(() => {
    dispatch(clearRecoveryError());
  }, []);

  useEffect(() => {
    dispatch(clearRecoveryError());
  }, [password, value]);

  const recoveryRequest = async () => {
    await dispatch(
      recoveryPassword({ phoneNumber: '7' + tel, email, password, isPhoneAuth })
    );
  };

  const restoreRequest = () => {
    dispatch(restorePassword({ password, value })).then(res => {
      if (res?.payload === null || res?.payload === undefined) {
        dispatch(clearRecoveryError());
        navigation.navigate(AuthScreenName.Password);
      }
    });
  };

  const focusInput = () => {
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
    value,
    email,
    timeout,
    password,
    setValue,
    focusInput,
    isPhoneAuth,
    setPassword,
    passwordRef,
    scrollViewRef,
    recoveryError,
    restoreRequest,
    recoveryRequest,
    onKeyboardWillShow,
  };
};

export default useRecoveryConfirmationScreen;
