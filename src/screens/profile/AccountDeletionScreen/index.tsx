import React from 'react';
import { FormProvider } from 'react-hook-form';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Banner, Button, Spacer, Text, useTheme } from 'rn-ui-kit';

import { CloseIcon } from '@/assets/icons/svg/screens/CloseIcon';
import Header from '@/components/Header';
import ControlledInput from '@/components/inputs/ControlledInput';
import { DeletionInfoBlock } from '@/components/TabScreens/AccountDeletionScreen/DeletionInfoBlock';
import useAccountDeletion from '@/screens/profile/AccountDeletionScreen/useAccountDeletion';
import {
  AccountDeletionScreenNavigationProp,
  AccountDeletionScreenRoute,
} from '@/types/navigation';

import styles from './style';

const AccountDeletionScreen = ({
  route,
  navigation,
}: {
  route: AccountDeletionScreenRoute;
  navigation: AccountDeletionScreenNavigationProp;
}) => {
  const theme = useTheme();
  const { methods, errors, onDelete, isBannerVisible, onBanner, onCopyEmail } =
    useAccountDeletion(navigation, route);

  return (
    <View style={styles.container}>
      <Header icon={<CloseIcon />} />
      <KeyboardAwareScrollView
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Spacer size="xl" />
        <Text variant="title2">Удалить аккаунт?</Text>
        <Spacer size="s" />
        <DeletionInfoBlock text="Данные аккаунта будут удалены" />
        <DeletionInfoBlock text="Информация о прошлых задачах будет недоступна" />
        <DeletionInfoBlock text="Это действие нельзя будет отменить" />
        <Spacer size="xxl" />
        <FormProvider {...methods}>
          <ControlledInput
            name="password"
            maxLength={64}
            variant="password"
            placeholder="Пароль"
            style={styles.input}
            hint={errors.password?.message}
            isError={!!errors.password?.message}
          />
          <Spacer size="xl" />
          <Button
            label="Да, удалить"
            onPress={onDelete}
            style={[styles.btn, { backgroundColor: theme.background.danger }]}
          />
        </FormProvider>
        <Spacer size="l" />
        <Button
          label="Отмена"
          variant="outlineAccent"
          onPress={navigation.goBack}
        />
        {isBannerVisible && (
          <>
            <Spacer />
            <Banner
              icon="alert"
              type="warning"
              onClosePress={onBanner}
              onButtonPress={onCopyEmail}
              containerStyle={styles.banner}
              title="Завершите активные задачи"
              buttonText="Скопировать адрес почты"
              text="Если у вас есть незавершенные задачи, то удалить аккаунт можно только обратившись в службу поддержки info@mastera-service.ru"
            />
          </>
        )}
      </KeyboardAwareScrollView>
    </View>
  );
};

export default AccountDeletionScreen;
