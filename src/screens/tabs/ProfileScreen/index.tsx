import React from 'react';
import { ActivityIndicator, SafeAreaView, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Spacer, TabControl, Text, Tips, useTheme } from 'rn-ui-kit';

import AccountTab from '@/components/TabScreens/ProfileScreen/AccountTab';
import ActivityTab from '@/components/TabScreens/ProfileScreen/ActivityTab';
import CommonTab from '@/components/TabScreens/ProfileScreen/CommonTab';
import PaymentTab from '@/components/TabScreens/ProfileScreen/PaymentTab';
import useProfile from '@/screens/tabs/ProfileScreen/useProfile';
import { ProfileTab } from '@/types/tab';

import styles from './style';

const confirmationPendingMessage =
  'Ваша учетная запись в ожидании подтверждения. Проверка обычно длится один рабочий день. Пожалуйста, для выполнения задач дождитесь окончания проверки';

const tabs = [
  { id: 0, label: ProfileTab.Common },
  { id: 1, label: ProfileTab.Payment },
  { id: 2, label: ProfileTab.Activity },
  { id: 3, label: ProfileTab.Account },
];

const ProfileScreen = () => {
  const theme = useTheme();
  const {
    user,
    warning,
    activeTab,
    switchTab,
    isLoading,
    isApprovalNotificationVisible,
  } = useProfile();

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.wrapper}>
          <Text variant="title1" style={styles.title}>
            Профиль
          </Text>
          {isLoading ? (
            <ActivityIndicator
              size="large"
              style={styles.loader}
              color={theme.background.accent}
            />
          ) : (
            <View>
              {(!user?.isApproved || !!warning) && <Spacer size="xl" />}
              {user && !user?.isApproved && !warning && (
                <Tips type="info" text={confirmationPendingMessage} />
              )}
              {!!warning && <Tips type="warning" text={warning} />}
              <Spacer size="xxl" />
              <TabControl data={tabs} initialId={0} onChange={switchTab} />
              <Spacer size="l" />
              {activeTab === ProfileTab.Common && user && (
                <CommonTab
                  user={user}
                  isApprovalNotificationVisible={isApprovalNotificationVisible}
                />
              )}
              {activeTab === ProfileTab.Payment && <PaymentTab />}
              {activeTab === ProfileTab.Activity && <ActivityTab />}
              {activeTab === ProfileTab.Account && <AccountTab />}
            </View>
          )}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
