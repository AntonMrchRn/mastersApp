import { useEffect, useRef } from 'react';
import { FieldPath } from 'react-hook-form/dist/types/path';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';

import { configApp } from '@/constants/platform';
import { AppScreenName } from '@/navigation/AppNavigation';
import useRecoveryConfirmationForm from '@/screens/auth/RecoveryConfirmationScreen/useRecoveryConfirmationForm';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  useRestorePasswordMutation,
  useSendPasswordRecoveryCodeMutation,
} from '@/store/api/auth';
import {
  setAuthPhoneTimeout,
  setIsRecoveryByPhone,
} from '@/store/slices/auth/actions';
import { selectAuth } from '@/store/slices/auth/selectors';
import { AxiosQueryErrorResponse, ErrorCode } from '@/types/error';
import { RecoveryConfirmationFormValues } from '@/types/form';
import {
  PasswordScreenNavigationProp,
  RecoveryConfirmationScreenRoute,
} from '@/types/navigation';

const OFFSET = 0;
const email = '';
const password = '';
const isPhoneAuth = true;
const inputNameByErrorCode: Partial<
  Record<ErrorCode, FieldPath<RecoveryConfirmationFormValues>>
> = {
  [ErrorCode.IncorrectVerificationCode]: 'code',
  [ErrorCode.IncorrectPassword]: 'password',
};

const useRecoveryConfirmation = () => {
  const route = useRoute<RecoveryConfirmationScreenRoute>();
  const navigation = useNavigation<PasswordScreenNavigationProp>();
  const scrollViewRef = useRef<KeyboardAwareScrollView>(null);
  const dispatch = useAppDispatch();

  const { phoneTimeout } = useAppSelector(selectAuth);

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

  const { errors, methods, isDisabled } = useRecoveryConfirmationForm();

  const phone = route.params.phone;
  const error = (recoveryPasswordError as AxiosQueryErrorResponse)?.data;

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
      if (error?.code === ErrorCode.Server) {
        return navigation.navigate(AppScreenName.Error);
      }

      const inputName = inputNameByErrorCode[error?.code];
      if (inputName) {
        methods.setError(inputName, {
          message: error?.message,
        });
      }
    }
  }, [isError]);

  const onRestorePasswordSuccess = async () => {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem('authPhoneTimeout', jsonValue);

      if (data === null || data === undefined) {
        navigation.navigate(AppScreenName.Password);
      }
    } catch (e) {
      console.log(`onRestorePasswordSuccess error: ${e}`);
    }
  };

  const onSendCodeSuccess = async () => {
    try {
      const jsonValue = JSON.stringify(timeout);
      await AsyncStorage.setItem('authPhoneTimeout', jsonValue);
      await dispatch(setAuthPhoneTimeout(timeout));
      dispatch(setIsRecoveryByPhone(true));
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

  const restorePassword = async ({
    code,
    password,
  }: RecoveryConfirmationFormValues) => {
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
    errors,
    methods,
    onFocus,
    sendCode,
    isLoading,
    isDisabled,
    phoneTimeout,
    scrollViewRef,
    onKeyboardWillShow,
    restorePassword: methods.handleSubmit(restorePassword),
  };
};

export default useRecoveryConfirmation;
