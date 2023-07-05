import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';

import { useAppDispatch, useAppSelector } from '@/store';
import {
  useEditPhoneMutation,
  useSendPhoneConfirmationCodeMutation,
} from '@/store/api/user';
import {
  setIsPhoneEditing,
  setProfilePhoneTimeout,
} from '@/store/slices/user/actions';
import { selectUser } from '@/store/slices/user/selectors';
import { AxiosQueryErrorResponse, ErrorCode } from '@/types/error';
import { CodeValue } from '@/types/form';
import {
  PhoneEditingConfirmationScreenRoute,
  ProfileNavigatorScreenName,
  ProfileScreenNavigationProp,
} from '@/types/navigation';
import { codeValidationSchema } from '@/utils/formValidation';

const usePhoneEditingConfirmation = () => {
  const route = useRoute<PhoneEditingConfirmationScreenRoute>();
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const dispatch = useAppDispatch();

  const { phoneTimeout } = useAppSelector(selectUser);

  const [sendConfirmationCode, { data: timeout, isSuccess: isCodeSuccess }] =
    useSendPhoneConfirmationCodeMutation();
  const [
    editPhone,
    { error: confirmationError, isError, isSuccess, isLoading },
  ] = useEditPhoneMutation();

  const methods = useForm({
    defaultValues: {
      code: '',
    },
    resolver: yupResolver(codeValidationSchema),
    mode: 'onBlur',
  });
  const {
    setError,
    handleSubmit,
    formState: { errors, isValid },
  } = methods;
  const isDisabled = !isValid;
  const phone = route.params.phone;
  const error = (confirmationError as AxiosQueryErrorResponse)?.data;

  useEffect(() => {
    if (isSuccess) {
      onEditPhoneSuccess();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isCodeSuccess) {
      onSendCodeSuccess();
    }
  }, [isCodeSuccess]);

  useEffect(() => {
    if (error?.code === ErrorCode.IncorrectVerificationCode) {
      setError('code', {
        message: error?.message,
      });
    }
  }, [isError]);

  const onSendCodeSuccess = async () => {
    try {
      const jsonValue = JSON.stringify(timeout);
      await AsyncStorage.setItem('profilePhoneTimeout', jsonValue);
      await dispatch(setProfilePhoneTimeout(timeout));
      dispatch(setIsPhoneEditing(true));
    } catch (e) {
      console.log(`onSendCodeSuccess error: ${e}`);
    }
  };

  const onEditPhoneSuccess = async () => {
    try {
      navigation.navigate(ProfileNavigatorScreenName.Profile);
      const jsonValue = JSON.stringify(null);
      await AsyncStorage.setItem('profilePhoneTimeout', jsonValue);
    } catch (e) {
      console.log(`onEditPhoneSuccess error: ${e}`);
    }
  };

  const sendCode = async () => {
    await sendConfirmationCode(`7${phone}`);
  };

  const confirmPhone = async ({ code }: CodeValue) => {
    await editPhone(code);
  };

  return {
    errors,
    methods,
    sendCode,
    isLoading,
    isDisabled,
    phoneTimeout,
    isPhoneExist: !!phone,
    confirmPhone: handleSubmit(confirmPhone),
  };
};

export default usePhoneEditingConfirmation;
