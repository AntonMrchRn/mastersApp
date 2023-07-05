import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useIsFocused } from '@react-navigation/native';
import { useToast } from 'rn-ui-kit';
import { TabItem } from 'rn-ui-kit/lib/typescript/components/TabControl';

import getWarning from '@/screens/tabs/ProfileScreen/getWarning';
import { useAppSelector } from '@/store';
import { useGetUserQuery } from '@/store/api/user';
import { selectAuth } from '@/store/slices/auth/selectors';
import { setIsApprovalNotificationShown } from '@/store/slices/user/actions';
import { selectUser } from '@/store/slices/user/selectors';
import { AxiosQueryErrorResponse } from '@/types/error';
import { ProfileTab } from '@/types/tab';

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
  const dispatch = useDispatch();
  const toast = useToast();

  const { user: authUser } = useAppSelector(selectAuth);
  const { isApprovalNotificationShown } = useAppSelector(selectUser);

  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useGetUserQuery(authUser?.userID, {
    skip: !authUser?.userID,
  });

  useEffect(() => {
    if (isError) {
      toast.show({
        type: 'error',
        title: (error as AxiosQueryErrorResponse)?.data?.message,
        contentHeight: 120,
      });
    }
  }, [isError]);

  const [activeTab, setActiveTab] = useState<Tab>(initialTab);
  const [isEntityModalVisible, setIsEntityModalVisible] =
    useState<boolean>(false);
  const isApprovalNotificationVisible =
    !isApprovalNotificationShown && !!user?.isApproved;

  useEffect(() => {
    if (isApprovalNotificationVisible) {
      dispatch(setIsApprovalNotificationShown(true));
    }
  }, [isFocused, activeTab.id]);

  const warning = getWarning(user);

  const switchTab = ({ id, label }: TabItem) => {
    setActiveTab({ id, label: label as ProfileTab });
  };

  return {
    user,
    warning,
    activeTab,
    switchTab,
    isLoading,
    isEntityModalVisible,
    setIsEntityModalVisible,
    isApprovalNotificationVisible,
  };
};

export default useProfile;
