import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard } from 'react-native';

import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useToast } from 'rn-ui-kit';

import { ProfileScreenName } from '@/navigation/ProfileNavigation';
import { useAppDispatch, useAppSelector } from '@/store';
import { useSendPhoneConfirmationCodeMutation } from '@/store/api/user';
import {
  setIsPhoneEditing,
  setProfilePhoneTimeout,
} from '@/store/slices/user/actions';
import { selectUser } from '@/store/slices/user/selectors';
import { AxiosQueryErrorResponse, ErrorCode } from '@/types/error';
import { PhoneValue } from '@/types/form';
import {
  PhoneEditingConfirmationScreenNavigationProp,
  PhoneEditingScreenRoute,
} from '@/types/navigation';
import { phoneValidationSchema } from '@/utils/formValidation';

const usePhoneEditing = () => {
  const navigation =
    useNavigation<PhoneEditingConfirmationScreenNavigationProp>();
  const toast = useToast();
  const route = useRoute<PhoneEditingScreenRoute>();
  const dispatch = useAppDispatch();

  const userPhone = route.params.phone;
  const { phoneTimeout, isActivePhoneTimer: isActiveTimer } =
    useAppSelector(selectUser);
  const [
    sendConfirmationCode,
    { data: timeout, isLoading, isSuccess, isError, error: codeError },
  ] = useSendPhoneConfirmationCodeMutation();

  const methods = useForm({
    defaultValues: {
      phone: userPhone || '',
    },
    resolver: yupResolver(phoneValidationSchema),
    mode: 'onBlur',
  });
  const {
    setError,
    watch,
    handleSubmit,
    formState: { errors },
  } = methods;
  const error = (codeError as AxiosQueryErrorResponse)?.data;
  const phone = watch('phone');

  useEffect(() => {
    if (isSuccess) {
      onSuccess();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error?.code === ErrorCode.PhoneAlreadyRegistered) {
      return setError('phone', {
        message: error.message,
      });
    }

    if (isError) {
      toast.show({
        type: 'error',
        title: error.message,
        contentHeight: 120,
      });
    }
  }, [isError]);

  useEffect(() => {
    if (phone?.length === 10) {
      Keyboard.dismiss();
    }
  }, [phone]);

  const onSuccess = async () => {
    try {
      const jsonValue = JSON.stringify(timeout);
      await AsyncStorage.setItem('profilePhoneTimeout', jsonValue);
      dispatch(setProfilePhoneTimeout(timeout));
      dispatch(setIsPhoneEditing(true));
      navigation.navigate(ProfileScreenName.PhoneEditingConfirmation, {
        phone,
      });
    } catch (e) {
      console.log(`onSuccess error: ${e}`);
    }
  };

  const sendCode = async ({ phone }: PhoneValue) => {
    await sendConfirmationCode(`7${phone}`);
  };

  return {
    errors,
    methods,
    isLoading,
    phoneTimeout,
    isActiveTimer,
    isPhoneExist: !!userPhone,
    sendCode: handleSubmit(sendCode),
  };
};

export default usePhoneEditing;
