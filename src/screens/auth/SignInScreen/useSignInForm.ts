import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as Keychain from 'react-native-keychain';

import { yupResolver } from '@hookform/resolvers/yup';
import { useIsFocused } from '@react-navigation/native';

import { SignInFormValues } from '@/types/form';
import {
  signInWithEmailValidationSchema,
  signInWithPhoneValidationSchema,
} from '@/utils/formValidation';

const partialDefaults = {
  password: '',
  isAgreeWithTerms: false,
};

const useSignInForm = (isPhoneAuth: boolean) => {
  const isFocused = useIsFocused();
  const methods = useForm<SignInFormValues>({
    defaultValues: isPhoneAuth
      ? { phone: '', ...partialDefaults }
      : { email: '', ...partialDefaults },
    resolver: yupResolver<SignInFormValues>(
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
    formState: { errors, isValid, isSubmitSuccessful },
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
    if (isSubmitSuccessful) {
      saveCredentials((isPhoneAuth ? '7' + phone : email) as string, password);
    }
  }, [isSubmitSuccessful]);

  useEffect(() => {
    reset({ phone: '', email: '', password, isAgreeWithTerms });
  }, [isPhoneAuth]);

  useEffect(() => {
    reset({ phone, email, password, isAgreeWithTerms });
  }, [isFocused]);

  const saveCredentials = async (login: string, password: string) => {
    try {
      await Keychain.setGenericPassword(login, password);
    } catch (e) {
      console.log('saveCredentials setGenericPassword error: ', e);
    }
  };

  return {
    errors,
    methods,
    isDisabled,
  };
};

export default useSignInForm;
