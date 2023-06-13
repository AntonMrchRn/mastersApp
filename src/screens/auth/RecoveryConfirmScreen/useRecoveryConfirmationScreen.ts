import { useEffect, useRef } from 'react';
import { FieldPath } from 'react-hook-form/dist/types/path';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';

import { configApp } from '@/constants/platform';
import useRecoveryConfirmationForm from '@/screens/auth/RecoveryConfirmScreen/useRecoveryConfirmationForm';
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
import { AxiosQueryErrorResponse, ErrorCode } from '@/types/error';
import { RecoveryConfirmationFormValues } from '@/types/form';
import {
  AuthScreenName,
  PasswordScreenNavigationProp,
  RecoveryConfirmScreenRoute,
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
  const { errors, methods, isDisabled } = useRecoveryConfirmationForm();

  const { timeoutPhone } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  const route = useRoute<RecoveryConfirmScreenRoute>();
  const navigation = useNavigation<PasswordScreenNavigationProp>();
  const scrollViewRef = useRef<KeyboardAwareScrollView>(null);

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
        return navigation.navigate(AuthScreenName.Error);
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
      await AsyncStorage.setItem('timePhone', jsonValue);

      if (data === null || data === undefined) {
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
    timeoutPhone,
    scrollViewRef,
    onKeyboardWillShow,
    restorePassword: methods.handleSubmit(restorePassword),
  };
};

export default useRecoveryConfirmationScreen;
