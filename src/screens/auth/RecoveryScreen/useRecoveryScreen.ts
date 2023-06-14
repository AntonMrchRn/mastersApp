import { useEffect, useRef, useState } from 'react';
import { FieldPath } from 'react-hook-form/dist/types/path';
import { Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import { configApp } from '@/constants/platform';
import useRecoveryForm from '@/screens/auth/RecoveryScreen/useRecoveryForm';
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
import { AxiosQueryErrorResponse, ErrorCode } from '@/types/error';
import { EmailValue, PhoneValue, RecoveryFormValues } from '@/types/form';
import {
  AuthScreenName,
  CompositeRecoveryConfirmAndEmailNavigationProp,
} from '@/types/navigation';
import { emailErrorMessage } from '@/utils/formValidation';

const OFFSET = 0;
const password = '';
const inputNameByErrorCode: Partial<
  Record<ErrorCode, FieldPath<RecoveryFormValues>>
> = {
  [ErrorCode.IncorrectPhone]: 'phone',
  [ErrorCode.IncorrectEmail]: 'email',
};

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

  const [activeTab, setActiveTab] = useState<AuthTab>(AuthTab.Phone);
  const scrollViewRef = useRef<KeyboardAwareScrollView>(null);

  const isPhoneAuth = activeTab === AuthTab.Phone;
  const error = (recoveryError as AxiosQueryErrorResponse)?.data;
  const { errors, methods, isDisabled, phone } = useRecoveryForm(isPhoneAuth);

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

  useEffect(() => {
    if (isRecoveryByPhone && isPhoneAuth && !isRecoveryByEmail) {
      navigation.navigate(AuthScreenName.RecoveryConfirm, {
        phone,
      });
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

  const sendCode = async (values: RecoveryFormValues) => {
    await sendRecoveryCode({
      phoneNumber: '7' + (values as PhoneValue).phone,
      email: (values as EmailValue).email,
      password,
      isPhoneAuth,
    });
  };

  const switchTab = (index: number) => {
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
    errors,
    methods,
    onFocus,
    switchTab,
    isLoading,
    isDisabled,
    isPhoneAuth,
    timeoutPhone,
    timeoutEmail,
    scrollViewRef,
    onKeyboardWillShow,
    sendCode: methods.handleSubmit(sendCode),
    isInvalidEmail: errors.email?.message === emailErrorMessage,
  };
};

export default useRecoveryScreen;
