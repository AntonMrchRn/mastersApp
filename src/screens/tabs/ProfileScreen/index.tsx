import React, { FC } from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { StackScreenProps } from '@react-navigation/stack';
import {
  BottomSheet,
  Button,
  Spacer,
  TabControl,
  Text,
  Tips,
  useTheme,
} from 'rn-ui-kit';

import CheckCircleIcon from '@/assets/icons/svg/screens/CheckCircleIcon';
import AccountTab from '@/components/tabs/ProfileScreen/AccountTab';
import ActivityTab from '@/components/tabs/ProfileScreen/ActivityTab';
import CommonTab from '@/components/tabs/ProfileScreen/CommonTab';
import PaymentTab from '@/components/tabs/ProfileScreen/PaymentTab';
import {
  ProfileScreenName,
  ProfileStackParamList,
} from '@/navigation/ProfileNavigation';
import useProfile from '@/screens/tabs/ProfileScreen/useProfile';
import { ProfileTab } from '@/types/tab';

import styles from './style';

const confirmationPendingMessage =
  'Ваша учетная запись в ожидании подтверждения. Проверка обычно длится один рабочий день. Пожалуйста, для выполнения задач дождитесь окончания проверки';

type ProfileScreenProps = StackScreenProps<
  ProfileStackParamList,
  ProfileScreenName.Profile
>;
const ProfileScreen: FC<ProfileScreenProps> = ({ route }) => {
  const tab = route?.params?.tab;
  const theme = useTheme();
  const {
    user,
    tabs,
    warning,
    refetch,
    activeTab,
    switchTab,
    isLoading,
    isFetching,
    onCopyEmail,
    scrollToEnd,
    scrollViewRef,
    onBlockingModalClose,
    onBlockingModalOpen,
    isInternalExecutor,
    isBlockingModalVisible,
    isApprovalNotificationVisible,
  } = useProfile({ tab });

  const tabComponents = {
    [ProfileTab.Common]: user && (
      <CommonTab
        user={user}
        onBlockingModalOpen={onBlockingModalOpen}
        isApprovalNotificationVisible={isApprovalNotificationVisible}
      />
    ),
    [ProfileTab.Payment]: user && (
      <PaymentTab
        user={user}
        scrollToEnd={scrollToEnd}
        activeTab={activeTab.label}
        onBlockingModalOpen={onBlockingModalOpen}
        entityType={user?.entityTypeDescription}
      />
    ),
    [ProfileTab.Activity]: user && (
      <ActivityTab user={user} isTeamVisible={!isInternalExecutor} />
    ),
    [ProfileTab.Account]: (
      <AccountTab hasActiveTasks={!!user?.hasActiveTasks} />
    ),
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={refetch} />
        }
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps={
          activeTab.label === ProfileTab.Activity ? 'handled' : undefined
        }
      >
        <View style={styles.wrapper}>
          <View style={styles.titleContainer}>
            <Text variant="title1" style={styles.title}>
              Профиль
            </Text>
            {user?.isApproved && (
              <View
                style={[
                  styles.banner,
                  { backgroundColor: theme.background.fieldSuccess },
                ]}
              >
                <CheckCircleIcon />
                <Text
                  variant="captionRegular"
                  color={theme.text.success}
                  style={styles.bannerText}
                >
                  Подтвержден
                </Text>
              </View>
            )}
          </View>
          <>
            {((user && !user?.isApproved) || !!warning) && !isLoading && (
              <Spacer size="xl" />
            )}
            {user && !user.isApproved && !warning && (
              <Tips type="info" text={confirmationPendingMessage} />
            )}
            {!!warning && <Tips type="warning" text={warning} />}
            <Spacer size="xxl" />
            <TabControl
              data={tabs}
              onChange={switchTab}
              currentTabId={activeTab.id}
            />
            <Spacer size="l" />
            {(isLoading || !user) && activeTab.label !== ProfileTab.Account ? (
              <ActivityIndicator
                size="large"
                style={styles.loader}
                color={theme.background.accent}
              />
            ) : (
              tabComponents[activeTab.label]
            )}
          </>
        </View>
        <BottomSheet
          title="Изменение заблокировано"
          isVisible={isBlockingModalVisible}
          onBackdropPress={onBlockingModalClose}
          onSwipeComplete={onBlockingModalClose}
          titleStyle={styles.modalTitle}
          backdropTransitionOutTiming={0}
        >
          <>
            <Spacer />
            <Text variant="bodyMRegular">
              {`Ваша учетная запись подтверждена.\nДля редактирования ранее заполненных данных свяжитесь с координатором или напишите в службу поддержки по адресу: info@mastera-service.ru`}
            </Text>
            <Spacer size="xl" />
            <Button
              variant="outlineAccent"
              label="Скопировать адрес почты"
              onPress={onCopyEmail}
            />
            <Spacer size="l" />
            <Button
              label="Хорошо, понятно"
              onPress={onBlockingModalClose}
              style={styles.btn}
            />
          </>
        </BottomSheet>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
