import { useCallback, useEffect } from 'react';
import { AppState, Linking } from 'react-native';

import { useIsFocused } from '@react-navigation/native';
import { useToast } from 'rn-ui-kit';

import { useAppSelector } from '@/store';
import {
  useGetUserParamsQuery,
  useGetUserQuery,
  useLazyEnableBotNotificationsQuery,
} from '@/store/api/user';
import { selectAuth } from '@/store/slices/auth/selectors';
import { AxiosQueryErrorResponse } from '@/types/error';

const useTelegramBot = () => {
  const toast = useToast();
  const { user: authUser } = useAppSelector(selectAuth);
  const isFocused = useIsFocused();
  const {
    data: user,
    error: userError,
    isError: isUserError,
    isLoading: isUserLoading,
    refetch,
  } = useGetUserQuery(authUser?.userID, {
    skip: !authUser?.userID,
  });
  const [
    enableBotNotifications,
    {
      isError: isBotError,
      error: botError,
      isLoading: isBotLoading,
      isSuccess,
    },
  ] = useLazyEnableBotNotificationsQuery();
  const {
    data: params,
    isError: isParamsError,
    error: paramsError,
    refetch: refetchParams,
  } = useGetUserParamsQuery();

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        refetch();
        refetchParams();
      }
    });
    return () => {
      subscription.remove();
    };
  }, []);
  useEffect(() => {
    if (isFocused) {
      refetch();
      refetchParams();
    }
  }, [isFocused]);
  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isParamsError || isUserError || isBotError) {
      toast.show({
        type: 'error',
        title: (
          (paramsError || userError || botError) as AxiosQueryErrorResponse
        ).data.message,
      });
    }
  }, [isParamsError, isUserError, isBotError]);

  const openTG = useCallback(
    async (tgBotTag: string) => {
      const link = `https://t.me/${tgBotTag}`;
      const supported = await Linking.canOpenURL(link);
      if (supported) {
        await Linking.openURL(link);
      } else {
        console.log('openTG error: link unsupported');
        toast.show({
          type: 'error',
          title: 'Не удалось открыть Telegram. Пожалуйста, повторите позже',
        });
      }
    },
    [params?.tgBotTag],
  );

  const onConnect = async () => {
    if (!user?.isTGConnected && params?.tgBotTag) {
      return openTG(params?.tgBotTag);
    }

    if (user?.isTGConnected) {
      await enableBotNotifications();
    }
  };

  const isBotActive = user?.isTGConnected && user?.isTGActive;
  const isLoading = isUserLoading || isBotLoading;
  return {
    onConnect,
    isLoading,
    isBotActive,
  };
};

export default useTelegramBot;
