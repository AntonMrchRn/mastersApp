import React from 'react';
import { ActivityIndicator, SafeAreaView, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {
  BottomSheet,
  Button,
  Spacer,
  TabControl,
  Text,
  Tips,
  useTheme,
} from 'rn-ui-kit';

import AccountTab from '@/components/tabs/ProfileScreen/AccountTab';
import ActivityTab from '@/components/tabs/ProfileScreen/ActivityTab';
import CommonTab from '@/components/tabs/ProfileScreen/CommonTab';
import PaymentTab from '@/components/tabs/ProfileScreen/PaymentTab';
import useProfile from '@/screens/tabs/ProfileScreen/useProfile';
import { ProfileTab } from '@/types/tab';

import styles from './style';

const confirmationPendingMessage =
  'Ваша учетная запись в ожидании подтверждения. Проверка обычно длится один рабочий день. Пожалуйста, для выполнения задач дождитесь окончания проверки';

const ProfileScreen = () => {
  const theme = useTheme();
  const {
    user,
    tabs,
    warning,
    activeTab,
    switchTab,
    isLoading,
    copyEmail,
    scrollToEnd,
    scrollViewRef,
    onBlockingModal,
    isContractorsVisible,
    isBlockingModalVisible,
    isApprovalNotificationVisible,
  } = useProfile();

  const tabComponents = {
    [ProfileTab.Common]: user && (
      <CommonTab
        user={user}
        onBlockingModal={onBlockingModal}
        isApprovalNotificationVisible={isApprovalNotificationVisible}
      />
    ),
    [ProfileTab.Payment]: user && (
      <PaymentTab
        user={user}
        scrollToEnd={scrollToEnd}
        activeTab={activeTab.label}
        onBlockingModal={onBlockingModal}
        entityType={user?.entityTypeDescription}
      />
    ),
    [ProfileTab.Activity]: user && (
      <ActivityTab user={user} isContractorsVisible={isContractorsVisible} />
    ),
    [ProfileTab.Account]: <AccountTab />,
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps={
          activeTab.label === ProfileTab.Activity ? 'handled' : undefined
        }
      >
        <View style={styles.wrapper}>
          <Text variant="title1" style={styles.title}>
            Профиль
          </Text>
          <>
            {((user && !user?.isApproved) || !!warning) && !isLoading && (
              <Spacer size="xl" />
            )}
            {user && !user.isApproved && !warning && (
              <Tips type="info" text={confirmationPendingMessage} />
            )}
            {!!warning && <Tips type="warning" text={warning} />}
            <Spacer size="xxl" />
            <TabControl data={tabs} onChange={switchTab} initialId={0} />
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
          closeIcon
          title="Изменение заблокировано"
          isVisible={isBlockingModalVisible}
          closeIconPress={onBlockingModal}
          onBackdropPress={onBlockingModal}
          onSwipeComplete={onBlockingModal}
          titleStyle={styles.modalTitle}
          backdropTransitionOutTiming={0}
          closeIconContainerStyle={styles.closeIcon}
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
              onPress={copyEmail}
            />
            <Spacer size="l" />
            <Button
              label="Хорошо, понятно"
              onPress={onBlockingModal}
              style={styles.btn}
            />
          </>
        </BottomSheet>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
