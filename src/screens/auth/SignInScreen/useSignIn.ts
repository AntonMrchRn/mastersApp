import { useEffect, useRef, useState } from 'react';
import { FieldPath } from 'react-hook-form/dist/types/path';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import { configApp } from '@/constants/platform';
import useConnectionInfo from '@/hooks/useConnectionInfo';
import { storageMMKV } from '@/mmkv/storage';
import useSignInForm from '@/screens/auth/SignInScreen/useSignInForm';
import { useAppDispatch } from '@/store';
import { useGetUserAuthMutation } from '@/store/api/auth';
import {
  login,
  setAuthEmailTimeout,
  setAuthPhoneTimeout,
  setUserAuth,
} from '@/store/slices/auth/actions';
import { AxiosQueryErrorResponse, ErrorCode } from '@/types/error';
import {
  SignInFormValues,
  SignInWithEmailFormValues,
  SignInWithPhoneFormValues,
} from '@/types/form';
import { AuthScreenName, ErrorScreenNavigationProp } from '@/types/navigation';
import { AuthTab, authTabByIndex } from '@/types/tab';
import { emailErrorMessage } from '@/utils/formValidation';

const OFFSET = 0;
const inputNameByErrorCode: Partial<
  Record<ErrorCode, FieldPath<SignInFormValues>>
> = {
  [ErrorCode.IncorrectPhone]: 'phone',
  [ErrorCode.IncorrectEmail]: 'email',
  [ErrorCode.IncorrectPassword]: 'password',
};

const useSignIn = () => {
  useConnectionInfo();
  const dispatch = useAppDispatch();
  const navigation = useNavigation<ErrorScreenNavigationProp>();

  const [
    getUserAuth,
    { data: userAuth, isSuccess, isLoading, isError, error: authError },
  ] = useGetUserAuthMutation();

  const [activeTab, setActiveTab] = useState<AuthTab>(AuthTab.Phone);
  const scrollViewRef = useRef<KeyboardAwareScrollView>(null);

  const isPhoneAuth = activeTab === AuthTab.Phone;
  const error = (authError as AxiosQueryErrorResponse)?.data;
  const { errors, methods, isDisabled } = useSignInForm(isPhoneAuth);

  useEffect(() => {
    getData();
  }, []);

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
    if (isSuccess && userAuth) {
      onLoginSuccess(userAuth.token);
    }
  }, [isSuccess]);

  const logIn = async (values: SignInFormValues) => {
    await getUserAuth({
      login: isPhoneAuth
        ? '7' + (values as SignInWithPhoneFormValues).phone
        : (values as SignInWithEmailFormValues).email,
      password: values.password,
    });
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('authPhoneTimeout');
      const jsonValueEmail = await AsyncStorage.getItem('authEmailTimeout');
      jsonValue && dispatch(setAuthPhoneTimeout(JSON.parse(jsonValue)));
      jsonValueEmail &&
        dispatch(setAuthEmailTimeout(JSON.parse(jsonValueEmail)));
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

  const switchTab = (tabIndex: number) => {
    setActiveTab(authTabByIndex[tabIndex] as AuthTab);
  };

  const onLoginSuccess = (token: string) => {
    storageMMKV.set('token', token);
    dispatch(login());
    dispatch(setUserAuth(userAuth));
  };

  return {
    errors,
    methods,
    onFocus,
    switchTab,
    isLoading,
    isDisabled,
    isPhoneAuth,
    scrollViewRef,
    onKeyboardWillShow,
    logIn: methods.handleSubmit(logIn),
    isInvalidEmail: errors?.email?.message === emailErrorMessage,
  };
};

export default useSignIn;
