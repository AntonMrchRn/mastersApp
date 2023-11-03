import React from 'react';
import { FormProvider } from 'react-hook-form';
import { View } from 'react-native';

import { Button, Spacer, Text, useTheme } from 'rn-ui-kit';

import Header from '@/components/Header';
import ControlledInput from '@/components/inputs/ControlledInput';
import Title from '@/components/tabs/ProfileScreen/Title';
import TimerBlockEmailProfile from '@/components/Timer/TimerBlockEmailProfile';
import { DismissKeyboardView } from '@/hocs/DismissKeyboardView';
import useEmailEditing from '@/screens/profile/EmailEditingScreen/useEmailEditing';

import styles from './style';

const EmailEditingScreen = () => {
  const theme = useTheme();
  const {
    errors,
    methods,
    sendCode,
    isLoading,
    clearErrors,
    emailTimeout,
    isEmailExist,
    isActiveEmailTimer,
  } = useEmailEditing();

  return (
    <View style={styles.container}>
      <Header title={`${isEmailExist ? 'Изменение' : 'Добавление'} почты`} />
      <DismissKeyboardView>
        <View style={styles.content}>
          <Spacer size="xl" />
          <Title
            title={`Введите ${isEmailExist ? 'новый ' : ''}адрес эл. почты`}
          />
          <Spacer />
          <Text variant="bodyMRegular" color={theme.text.neutral}>
            Мы отправим вам письмо на {isEmailExist ? 'новый' : ''} адрес почты
            для её подтверждения
          </Text>
          <Spacer size="xl" />
          <FormProvider {...methods}>
            <ControlledInput
              name="email"
              variant="text"
              maxLength={60}
              label="Электронная почта"
              autoCapitalize="none"
              onClear={clearErrors}
              style={styles.input}
              keyboardType="email-address"
              isError={!!errors.email?.message}
              hint={errors.email?.message}
            />
            <Spacer size="xl" />
            <Button
              label="Получить письмо"
              style={styles.btn}
              isPending={isLoading}
              disabled={isActiveEmailTimer}
              onPress={sendCode}
            />
          </FormProvider>
          {!!emailTimeout && (
            <TimerBlockEmailProfile
              expiredTimer={Number(emailTimeout?.timeout * 1000)}
            />
          )}
        </View>
      </DismissKeyboardView>
    </View>
  );
};

export default EmailEditingScreen;
