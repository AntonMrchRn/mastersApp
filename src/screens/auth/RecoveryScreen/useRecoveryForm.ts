import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard } from 'react-native';

import { yupResolver } from '@hookform/resolvers/yup';
import { useIsFocused } from '@react-navigation/native';

import { useAppSelector } from '@/store';
import { selectAuth } from '@/store/slices/auth/selectors';
import { RecoveryFormValues } from '@/types/form';
import {
  recoveryEmailValidationSchema,
  recoveryPhoneValidationSchema,
} from '@/utils/formValidation';

const useRecoveryForm = (isPhoneAuth: boolean) => {
  const isFocused = useIsFocused();
  const { isActivePhoneTimer, isActiveEmailTimer } = useAppSelector(selectAuth);
  const methods = useForm<RecoveryFormValues>({
    defaultValues: isPhoneAuth ? { phone: '' } : { email: '' },
    resolver: yupResolver<RecoveryFormValues>(
      isPhoneAuth
        ? recoveryPhoneValidationSchema
        : recoveryEmailValidationSchema
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
    reset({ phone: '', email: '' });
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
