import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { useToast } from 'rn-ui-kit';

import { ProfileScreenName } from '@/navigation/ProfileNavigation';
import { useChangePasswordMutation } from '@/store/api/auth';
import { AxiosQueryErrorResponse, ErrorCode } from '@/types/error';
import { ChangePasswordScreenNavigationProp } from '@/types/navigation';
import { changePasswordValidationSchema } from '@/utils/formValidation';

const defaultValues = {
  currentPassword: '',
  newPassword: '',
  repeatedNewPassword: '',
};

const useChangePassword = (navigation: ChangePasswordScreenNavigationProp) => {
  const toast = useToast();
  const [
    changePassword,
    { isSuccess, isLoading, error: passwordError, isError },
  ] = useChangePasswordMutation();

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(changePasswordValidationSchema),
    mode: 'onTouched',
  });
  const {
    watch,
    setError,
    formState: { isDirty, errors },
  } = methods;
  const error = (passwordError as AxiosQueryErrorResponse)?.data;
  const password = watch('currentPassword');
  const newPassword = watch('newPassword');
  const repeatedNewPassword = watch('repeatedNewPassword');

  useEffect(() => {
    if (isError) {
      if (error.code === ErrorCode.IncorrectPassword) {
        return setError('currentPassword', {
          message: error.message,
        });
      }

      toast.show({
        type: 'error',
        title: error.message,
        contentHeight: 120,
      });
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      navigation.navigate(ProfileScreenName.Profile);
    }
  }, [isSuccess]);

  const onChangePassword = async () => {
    if (password === newPassword) {
      return setError('newPassword', {
        message: 'Новый пароль не должен совпадать с текущим',
      });
    }

    if (newPassword !== repeatedNewPassword) {
      return setError('repeatedNewPassword', {
        message: 'Подтверждение не совпадает с новым паролем',
      });
    }

    await changePassword({
      password,
      newPassword,
    });
  };

  return {
    errors,
    methods,
    isDirty,
    isLoading,
    onChangePassword,
  };
};

export default useChangePassword;
