import { useEffect, useRef, useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Clipboard from '@react-native-community/clipboard';
import { useIsFocused } from '@react-navigation/native';
import { useToast } from 'rn-ui-kit';
import { TabItem } from 'rn-ui-kit/lib/typescript/components/TabControl';

import getWarning from '@/screens/tabs/ProfileScreen/getWarning';
import { useAppSelector } from '@/store';
import { useGetUserQuery } from '@/store/api/user';
import { selectAuth } from '@/store/slices/auth/selectors';
import {
  setIsApprovalNotificationShown,
  setLinkTimeout,
} from '@/store/slices/user/actions';
import { selectUser } from '@/store/slices/user/selectors';
import { AxiosQueryErrorResponse } from '@/types/error';
import { ProfileTab } from '@/types/tab';
import { UserRole } from '@/types/user';

import styles from './style';

type Tab = {
  id: number;
  label: ProfileTab;
};

const initialTab = {
  id: 0,
  label: ProfileTab.Common,
};

const useProfile = () => {
  const isFocused = useIsFocused();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const toast = useToast();
  const scrollViewRef = useRef<KeyboardAwareScrollView>(null);

  const { user: authUser } = useAppSelector(selectAuth);
  const { isApprovalNotificationShown } = useAppSelector(selectUser);
  const {
    data: user,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetUserQuery(authUser?.userID, {
    skip: !authUser?.userID,
  });

  const [activeTab, setActiveTab] = useState<Tab>(initialTab);
  const [isBlockingModalVisible, setIsBlockingModalVisible] =
    useState<boolean>(false);

  useEffect(() => {
    if (isError) {
      toast.show({
        type: 'error',
        title: (error as AxiosQueryErrorResponse).data.message,
      });
    }
  }, [isError]);

  useEffect(() => {
    if (isApprovalNotificationVisible) {
      dispatch(setIsApprovalNotificationShown(true));
    }
  }, [isFocused, activeTab.id]);

  useEffect(() => {
    if (isFocused) {
      refetch();
      getData();
    }
  }, [isFocused]);

  const isApprovalNotificationVisible =
    !isApprovalNotificationShown && !!user?.isApproved;
  const isInternalExecutor =
    authUser?.roleDescription === UserRole.internalExecutor ||
    authUser?.roleDescription === UserRole.coordinator;

  const warning = getWarning(isInternalExecutor, user);

  const tabs = [
    { id: 0, label: ProfileTab.Common },
    ...(!isInternalExecutor ? [{ id: 1, label: ProfileTab.Payment }] : []),
    { id: 2, label: ProfileTab.Activity },
    { id: 3, label: ProfileTab.Account },
  ];

  const onBlockingModal = () =>
    setIsBlockingModalVisible(!isBlockingModalVisible);

  const switchTab = ({ id, label }: TabItem) => {
    setActiveTab({ id, label: label as ProfileTab });
  };

  const scrollToEnd = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd(true);
    }, 0);
  };

  const onCopyEmail = () => {
    onBlockingModal();
    Clipboard.setString('info@mastera-service.ru');
    toast.show({
      type: 'success',
      titleStyle: styles.toastTitle,
      title: 'Адрес почты скопирован',
      containerStyle: { height: 60 + insets.top },
    });
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('linkTimeout');
      jsonValue && dispatch(setLinkTimeout(JSON.parse(jsonValue)));
    } catch (e) {
      console.log(`getData value reading error: ${e}`);
    }
  };

  return {
    user,
    tabs,
    warning,
    activeTab,
    switchTab,
    isLoading,
    onCopyEmail,
    scrollToEnd,
    scrollViewRef,
    onBlockingModal,
    isInternalExecutor,
    isBlockingModalVisible,
    isApprovalNotificationVisible,
  };
};

export default useProfile;
