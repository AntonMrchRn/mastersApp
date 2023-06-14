import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { useIsFocused } from '@react-navigation/native';

import { RecoveryConfirmationFormValues } from '@/types/form';
import { recoveryConfirmationValidationSchema } from '@/utils/formValidation';

const defaultValues = {
  code: '',
  password: '',
};

const useRecoveryConfirmationForm = () => {
  const isFocused = useIsFocused();
  const methods = useForm<RecoveryConfirmationFormValues>({
    defaultValues: defaultValues,
    resolver: yupResolver(recoveryConfirmationValidationSchema),
    mode: 'onChange',
  });

  const {
    watch,
    reset,
    setFocus,
    formState: { errors, isValid },
  } = methods;
  const code = watch('code');
  const password = watch('password');
  const isDisabled = !isValid || !!Object.keys(errors).length;

  useEffect(() => {
    reset({ code, password });
  }, [isFocused]);

  useEffect(() => {
    if (code?.length === 6) {
      setFocus('password');
    }
  }, [code]);

  return {
    errors,
    methods,
    isDisabled,
  };
};

export default useRecoveryConfirmationForm;
