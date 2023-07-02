import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { useToast } from 'rn-ui-kit';

import useConnectionInfo from '@/hooks/useConnectionInfo';
import { useAppDispatch, useAppSelector } from '@/store';
import { useSendEmailConfirmationCodeMutation } from '@/store/api/user';
import {
  setIsEmailEditing,
  setProfileEmailTimeout,
} from '@/store/slices/user/actions';
import { selectUser } from '@/store/slices/user/selectors';
import { AxiosQueryErrorResponse, ErrorCode } from '@/types/error';
import { EmailValue } from '@/types/form';
import {
  EmailEditingScreenRoute,
  ProfileNavigatorScreenName,
  ProfileScreenNavigationProp,
} from '@/types/navigation';
import { emailValidationSchema } from '@/utils/formValidation';

const useEmailEditing = () => {
  useConnectionInfo();
  const isFocused = useIsFocused();
  const toast = useToast();
  const route = useRoute<EmailEditingScreenRoute>();
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const dispatch = useAppDispatch();

  const { emailTimeout, isActiveEmailTimer } = useAppSelector(selectUser);
  const [
    sendConfirmationCode,
    { data: timeout, isLoading, isSuccess, error: codeError, isError },
  ] = useSendEmailConfirmationCodeMutation();
  const error = (codeError as AxiosQueryErrorResponse)?.data;
  const userEmail = route.params.email;

  const methods = useForm({
    defaultValues: {
      email: userEmail || '',
    },
    resolver: yupResolver(emailValidationSchema),
    mode: 'onBlur',
  });
  const {
    setError,
    reset,
    watch,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = methods;
  const email = watch('email');
  const isEmailExist = !!userEmail;

  useEffect(() => {
    reset();
  }, [isFocused]);

  useEffect(() => {
    if (isSuccess) {
      onSuccess();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error?.code === ErrorCode.EmailAlreadyRegistered) {
      return setError('email', {
        message: error?.message,
      });
    }

    if (isError) {
      toast.show({
        type: 'error',
        title: 'Изменение данных невозможно',
        contentHeight: 100,
      });
    }
  }, [isError]);

  useEffect(() => {
    clearErrors();
  }, [email]);

  const onSuccess = async () => {
    try {
      const jsonValue = JSON.stringify(timeout);
      await AsyncStorage.setItem('profileEmailTimeout', jsonValue);
      await dispatch(setProfileEmailTimeout(timeout));
      dispatch(setIsEmailEditing(true));
      navigation.navigate(ProfileNavigatorScreenName.Profile);
    } catch (e) {
      console.log(`onSuccess error: ${e}`);
    }
  };

  const sendCode = async ({ email }: EmailValue) => {
    await sendConfirmationCode(email);
  };

  return {
    errors,
    methods,
    isLoading,
    clearErrors,
    emailTimeout,
    isEmailExist,
    isActiveEmailTimer,
    sendCode: handleSubmit(sendCode),
  };
};

export default useEmailEditing;
