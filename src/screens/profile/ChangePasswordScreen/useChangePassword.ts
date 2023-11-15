import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Keychain from 'react-native-keychain';

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
    mode: 'onChange',
  });
  const {
    watch,
    setError,
    handleSubmit,
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
      });
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      onSuccess();
    }
  }, [isSuccess]);

  const onSuccess = async () => {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        await Keychain.setGenericPassword(credentials.username, newPassword);
        navigation.navigate(ProfileScreenName.Profile);
      } else {
        throw new Error('no credentials');
      }
    } catch (e) {
      console.log('onSuccess setGenericPassword error: ', e);
    }
  };

  const onChangePassword = async () => {
    let isError = false;
    if (password === newPassword) {
      setError('newPassword', {
        message: 'Новый пароль не должен совпадать с текущим',
      });
      isError = true;
    }
    if (newPassword !== repeatedNewPassword) {
      setError('repeatedNewPassword', {
        message: 'Подтверждение не совпадает с новым паролем',
      });
      isError = true;
    }
    if (!isError) {
      await changePassword({
        password,
        newPassword,
      });
    }
  };

  return {
    errors,
    methods,
    isDirty,
    isLoading,
    onChangePassword: handleSubmit(onChangePassword),
  };
};

export default useChangePassword;
