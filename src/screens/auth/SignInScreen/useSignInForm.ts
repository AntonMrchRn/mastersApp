import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { useIsFocused } from '@react-navigation/native';

import {
  signInWithEmailValidationSchema,
  signInWithPhoneValidationSchema,
} from '@/utils/formValidation';

const defaultValues = {
  phone: '',
  email: '',
  password: '',
  isAgreeWithTerms: false,
};

const useSignInForm = (isPhoneAuth: boolean) => {
  const isFocused = useIsFocused();
  const methods = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(
      isPhoneAuth
        ? signInWithPhoneValidationSchema
        : signInWithEmailValidationSchema
    ),
    mode: 'onChange',
  });

  const {
    watch,
    reset,
    setFocus,
    clearErrors,
    formState: { errors, isValid },
  } = methods;
  const email = watch('email');
  const phone = watch('phone');
  const password = watch('password');
  const isAgreeWithTerms = watch('isAgreeWithTerms');
  const isDisabled = !isValid || !!Object.keys(errors).length;

  useEffect(() => {
    if (phone?.length === 10) {
      setFocus('password');
    }

    clearErrors();
  }, [phone, email]);

  useEffect(() => {
    reset({ phone: '', email: '', password, isAgreeWithTerms });
  }, [isPhoneAuth]);

  useEffect(() => {
    reset({ phone, email, password, isAgreeWithTerms });
  }, [isFocused]);

  return {
    errors,
    methods,
    isDisabled,
  };
};

export default useSignInForm;
