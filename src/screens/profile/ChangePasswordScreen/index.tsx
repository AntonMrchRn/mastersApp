import React from 'react';
import { FormProvider } from 'react-hook-form';
import { View } from 'react-native';

import { Button, Spacer, Text } from 'rn-ui-kit';

import Header from '@/components/Header';
import ControlledInput from '@/components/inputs/ControlledInput';
import useChangePassword from '@/screens/profile/ChangePasswordScreen/useChangePassword';
import { ChangePasswordScreenNavigationProp } from '@/types/navigation';

import styles from './style';

const ChangePasswordScreen = ({
  navigation,
}: {
  navigation: ChangePasswordScreenNavigationProp;
}) => {
  const { errors, methods, isDirty, isLoading, onChangePassword } =
    useChangePassword(navigation);

  return (
    <View style={styles.container}>
      <Header title="Безопасность" />
      <Spacer size="xl" />
      <View style={styles.content}>
        <Text variant="title3">Изменение пароля</Text>
        <Spacer size="xl" />
        <FormProvider {...methods}>
          <ControlledInput
            name="currentPassword"
            maxLength={64}
            label="Ваш текущий пароль"
            variant="password"
            style={styles.input}
            isError={!!errors.currentPassword?.message}
            hint={errors.currentPassword?.message}
          />
          <Spacer size="l" />
          <ControlledInput
            name="newPassword"
            maxLength={64}
            variant="password"
            label="Новый пароль"
            style={styles.input}
            isError={!!errors.newPassword?.message}
            hint={errors.newPassword?.message}
          />
          <Spacer size="l" />
          <ControlledInput
            name="repeatedNewPassword"
            maxLength={64}
            variant="password"
            label="Повторите новый пароль"
            style={styles.input}
            isError={!!errors.repeatedNewPassword?.message}
            hint={errors.repeatedNewPassword?.message}
          />
          <Spacer size="xl" />
          <Button
            style={styles.btn}
            disabled={!isDirty}
            isPending={isLoading}
            label="Обновить пароль"
            onPress={onChangePassword}
          />
        </FormProvider>
      </View>
    </View>
  );
};

export default ChangePasswordScreen;
