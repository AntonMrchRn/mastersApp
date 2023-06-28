import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useIsFocused } from '@react-navigation/native';
import { TabItem } from 'rn-ui-kit/lib/typescript/components/TabControl';

import useWarning from '@/screens/tabs/ProfileScreen/useWarning';
import { useAppSelector } from '@/store';
import { useGetUserQuery } from '@/store/api/user';
import { selectAuth } from '@/store/slices/auth/selectors';
import { setIsApprovalNotificationShown } from '@/store/slices/user/actions';
import { selectUser } from '@/store/slices/user/selectors';
import { ProfileTab } from '@/types/tab';

const useProfile = () => {
  const warning = useWarning();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const { user: authUser } = useAppSelector(selectAuth);
  const { isApprovalNotificationShown } = useAppSelector(selectUser);

  const {
    data: user,
    isLoading,
    refetch,
  } = useGetUserQuery(authUser?.userID, {
    skip: !authUser?.userID,
  });

  const [activeTab, setActiveTab] = useState<ProfileTab>(ProfileTab.Common);
  const isApprovalNotificationVisible =
    !isApprovalNotificationShown && !!user?.isApproved;

  useEffect(() => {
    if (isApprovalNotificationVisible) {
      dispatch(setIsApprovalNotificationShown(true));
    }
  }, [isFocused, activeTab]);

  useEffect(() => {
    refetch();
  }, [isFocused]);

  const switchTab = (tab: TabItem) => {
    setActiveTab(tab.label as ProfileTab);
  };

  return {
    user,
    warning,
    activeTab,
    switchTab,
    isLoading,
    isApprovalNotificationVisible,
  };
};

export default useProfile;
