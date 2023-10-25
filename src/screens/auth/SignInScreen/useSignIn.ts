import { useEffect, useRef, useState } from 'react';
import { FieldPath } from 'react-hook-form/dist/types/path';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useToast } from 'rn-ui-kit';

import { configApp } from '@/constants/platform';
import { storageMMKV } from '@/mmkv/storage';
import { AppScreenName } from '@/navigation/AppNavigation';
import useSignInForm from '@/screens/auth/SignInScreen/useSignInForm';
import { getPushToken } from '@/services/notifications/getPushToken';
import { useAppDispatch } from '@/store';
import { useGetUserAuthMutation } from '@/store/api/auth';
import { usePostTokenMutation } from '@/store/api/user';
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
import { ErrorScreenNavigationProp } from '@/types/navigation';
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
  const toast = useToast();
  const dispatch = useAppDispatch();
  const navigation = useNavigation<ErrorScreenNavigationProp>();

  const [
    getUserAuth,
    { data: userAuth, isSuccess, isLoading, isError, error: authError },
  ] = useGetUserAuthMutation();

  const [postToken, tokenMutation] = usePostTokenMutation();

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
        return navigation.navigate(AppScreenName.Error);
      }
      if (
        error?.code === ErrorCode.NetworkError &&
        error.message !== 'canceled'
      ) {
        toast.show({
          type: 'error',
          title: error.message,
        });
      }
      if (error.message === 'canceled') {
        toast.show({
          type: 'error',
          title:
            'Отсутствует связь с сервером. Проверьте доступность сети интернет или сети Wi-Fi.',
        });
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
    if (tokenMutation.isError) {
      toast.show({
        type: 'error',
        title: (tokenMutation.error as AxiosQueryErrorResponse).data.message,
      });
    }
  }, [tokenMutation.isError]);

  useEffect(() => {
    if (isSuccess && userAuth) {
      onLoginSuccess(userAuth.token);
    }
  }, [isSuccess]);

  const signIn = async (values: SignInFormValues) => {
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

  const onLoginSuccess = async (token: string) => {
    storageMMKV.set('token', token);
    try {
      const pushToken = await getPushToken();
      await postToken({
        typeID: configApp.android ? 1 : 2,
        token: pushToken,
      });
    } catch (err) {
      console.log('onLoginSuccess getPushToken error', err);
    } finally {
      dispatch(setUserAuth(userAuth));
      dispatch(login());
    }
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
    signIn: methods.handleSubmit(signIn),
    isInvalidEmail: errors?.email?.message === emailErrorMessage,
  };
};

export default useSignIn;
