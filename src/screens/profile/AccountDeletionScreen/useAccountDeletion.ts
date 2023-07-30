import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard } from 'react-native';
import Keychain from 'react-native-keychain';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { yupResolver } from '@hookform/resolvers/yup';
import Clipboard from '@react-native-community/clipboard';
import { useIsFocused } from '@react-navigation/native';
import { useToast } from 'rn-ui-kit';

import { storageMMKV } from '@/mmkv/storage';
import styles from '@/screens/tabs/ProfileScreen/style';
import { useAppDispatch } from '@/store';
import { useDeleteAccountMutation } from '@/store/api/user';
import { logOut } from '@/store/slices/auth/actions';
import { AxiosQueryErrorResponse } from '@/types/error';
import {
  AccountDeletionScreenNavigationProp,
  AccountDeletionScreenRoute,
} from '@/types/navigation';
import { accountDeletionPasswordValidationSchema } from '@/utils/formValidation';

const useAccountDeletion = (
  navigation: AccountDeletionScreenNavigationProp,
  { params }: AccountDeletionScreenRoute
) => {
  const isFocused = useIsFocused();
  const insets = useSafeAreaInsets();
  const toast = useToast();
  const dispatch = useAppDispatch();

  const [isBannerVisible, setIsBannerVisible] = useState<boolean>(false);
  const [deleteAccount, { isSuccess, isError, error: deletionError }] =
    useDeleteAccountMutation();
  const error = (deletionError as AxiosQueryErrorResponse)?.data;

  useEffect(() => {
    if (isSuccess) {
      storageMMKV.clearAll();
      dispatch(logOut());
    }
  }, [isSuccess]);

  useEffect(() => {
    if (!isFocused && isBannerVisible) {
      onBanner();
    }

    if (!isFocused && !!errors?.password?.message) {
      reset();
    }
  }, [isFocused]);

  useEffect(() => {
    if (isError) {
      toast.show({
        type: 'error',
        title: error.message,
      });
    }
  }, [isError]);

  const methods = useForm({
    defaultValues: { password: '' },
    resolver: yupResolver(accountDeletionPasswordValidationSchema),
    mode: 'onTouched',
  });
  const {
    reset,
    watch,
    setError,
    formState: { errors },
    handleSubmit,
  } = methods;
  const password = watch('password');

  const onBanner = () => setIsBannerVisible(!isBannerVisible);

  const onCopyEmail = () => {
    Clipboard.setString('info@mastera-service.ru');
    toast.show({
      type: 'success',
      titleStyle: styles.toastTitle,
      title: 'Адрес почты скопирован',
      containerStyle: { height: 60 + insets.top },
    });
  };

  const onDelete = async () => {
    Keyboard.dismiss();
    if (params.hasActiveTasks) {
      return onBanner();
    }

    try {
      const credentials = await Keychain.getGenericPassword();

      if (credentials) {
        if (credentials.password !== password) {
          return setError('password', {
            message: 'Неверный пароль, попробуйте ещё раз',
          });
        }

        await deleteAccount({
          login: credentials.username,
          password,
        });
      } else {
        toast.show({
          type: 'error',
          title: 'Не удалось удалить аккаунт. Повторите, пожалуйста, позже',
        });
        throw new Error('no credentials');
      }
    } catch (e) {
      console.log('onDelete getGenericPassword error: ', e);
    }
  };

  return {
    errors,
    methods,
    onBanner,
    onCopyEmail,
    isBannerVisible,
    onDelete: handleSubmit(onDelete),
  };
};

export default useAccountDeletion;
