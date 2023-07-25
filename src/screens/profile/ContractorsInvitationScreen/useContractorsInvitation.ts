import { useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Clipboard from '@react-native-community/clipboard';
import { useToast } from 'rn-ui-kit';

import { storageMMKV } from '@/mmkv/storage';
import styles from '@/screens/profile/ContractorsInvitationScreen/style';
import { useAppDispatch, useAppSelector } from '@/store';
import { useLazyGetInvitationLinkQuery } from '@/store/api/user';
import { selectAuth } from '@/store/slices/auth/selectors';
import {
  setIsLinkGenerating,
  setLinkTimeout,
} from '@/store/slices/user/actions';
import { selectUser } from '@/store/slices/user/selectors';
import { AxiosQueryErrorResponse } from '@/types/error';

const useContractorsInvitation = () => {
  const toast = useToast();
  const link = storageMMKV.getString('invitationLink');
  const dispatch = useAppDispatch();
  const { user: authUser } = useAppSelector(selectAuth);
  const { linkTimeout } = useAppSelector(selectUser);

  const [generateLink, { data, isSuccess, isError, error, isLoading }] =
    useLazyGetInvitationLinkQuery({
      selectFromResult: ({ data, isLoading, isError, isSuccess, error }) => {
        const splitID = `${authUser?.userID}`.split('');
        const hash = ['/', ...splitID]
          .map(v => v.charCodeAt(0).toString(16))
          .join('');

        return {
          data: data
            ? `https://sandbox9.apteka-aprel.ru/invite/${data}${hash}`
            : undefined,
          error,
          isError,
          isSuccess,
          isLoading,
        };
      },
    });

  useEffect(() => {
    if (isSuccess) {
      onSuccess();
    }
  }, [isSuccess, data]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (isError) {
      toast.show({
        type: 'error',
        title: (error as AxiosQueryErrorResponse).data.message,
        contentHeight: 100,
      });
    }
  }, [isError]);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('linkTimeout');
      jsonValue && dispatch(setLinkTimeout(JSON.parse(jsonValue)));
    } catch (e) {
      console.log(`getData value reading error: ${e}`);
    }
  };

  const onSuccess = async () => {
    try {
      const timeout = { timeout: 60 };
      const jsonValue = JSON.stringify(timeout);
      await AsyncStorage.setItem('linkTimeout', jsonValue);
      await dispatch(setLinkTimeout(timeout));
      dispatch(setIsLinkGenerating(true));
      if (data) {
        storageMMKV.set('invitationLink', data);
      }
    } catch (e) {
      console.log(`onSuccess error: ${e}`);
    }
  };

  const onGenerateLink = async () => {
    await generateLink();
  };

  const copyLink = (link: string) => {
    Clipboard.setString(link);
    toast.show({
      type: 'success',
      titleStyle: styles.toastTitle,
      title: 'Ссылка-приглашение скопирована',
      containerStyle: styles.toastContainer,
    });
  };

  return {
    link,
    isLoading,
    copyLink,
    linkTimeout,
    onGenerateLink,
  };
};

export default useContractorsInvitation;
