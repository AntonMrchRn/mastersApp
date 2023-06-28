import { useEffect } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { Keyboard } from 'react-native';

import { yupResolver } from '@hookform/resolvers/yup';
import { useIsFocused } from '@react-navigation/native';

import { useAppSelector } from '@/store';
import { selectAuth } from '@/store/slices/auth/selectors';
import {
  authPhoneValidationSchema,
  emailValidationSchema,
} from '@/utils/formValidation';

const defaultValues = {
  phone: '',
  email: '',
};

const useRecoveryForm = (isPhoneAuth: boolean) => {
  const isFocused = useIsFocused();
  const { isActivePhoneTimer, isActiveEmailTimer } = useAppSelector(selectAuth);
  const methods = useForm({
    defaultValues: isPhoneAuth ? { phone: '' } : { email: '' },
    resolver: yupResolver(
      isPhoneAuth ? authPhoneValidationSchema : emailValidationSchema
    ),
    mode: 'onChange',
  });

  const {
    watch,
    reset,
    formState: { errors, isValid },
  } = methods;
  const email = watch('email');
  const phone = watch('phone');
  const isPhoneTimer = isActivePhoneTimer && isPhoneAuth;
  const isEmailTimer = isActiveEmailTimer && !isPhoneAuth;
  const isDisabled =
    !isValid || !!Object.keys(errors).length || isPhoneTimer || isEmailTimer;

  useEffect(() => {
    reset({ phone, email });
  }, [isFocused]);

  useEffect(() => {
    reset(defaultValues);
  }, [isPhoneAuth]);

  useEffect(() => {
    if (phone?.length === 10) {
      Keyboard.dismiss();
    }
  }, [phone]);

  return {
    phone,
    errors,
    methods,
    isDisabled,
  };
};

export default useRecoveryForm;
