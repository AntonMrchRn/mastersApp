import React from 'react';
import { FormProvider } from 'react-hook-form';
import { View } from 'react-native';

import { Button, Spacer, Text, useTheme } from 'rn-ui-kit';

import Header from '@/components/Header';
import ControlledInputPhone from '@/components/inputs/ControlledInputPhone';
import Title from '@/components/TabScreens/ProfileScreen/Title';
import TimerBlockPhoneProfile from '@/components/Timer/TimerBlockPhoneProfile';
import { DismissKeyboardView } from '@/hocs/DismissKeyboardView';
import usePhoneEditing from '@/screens/tabs/PhoneEditingScreen/usePhoneEditing';

import styles from './style';

const PhoneEditingScreen = () => {
  const theme = useTheme();
  const {
    errors,
    methods,
    sendCode,
    isLoading,
    phoneTimeout,
    isActiveTimer,
    isPhoneExist,
  } = usePhoneEditing();

  return (
    <View style={styles.container}>
      <Header title={`${isPhoneExist ? 'Изменение' : 'Добавление'} телефона`} />
      <DismissKeyboardView>
        <View style={styles.content}>
          <Spacer size="xl" />
          <Title
            title={`Введите ${isPhoneExist ? 'новый' : ''} номер телефона`}
          />
          <Spacer />
          <Text variant="bodyMRegular" color={theme.text.neutral}>
            Мы отправим вам смс с кодом для подтверждения номера телефона
          </Text>
          <Spacer size="xl" />
          <FormProvider {...methods}>
            <ControlledInputPhone
              name="phone"
              hint={errors.phone?.message}
              isError={!!errors.phone?.message}
            />
            <Spacer size="xl" />
            <Button
              onPress={sendCode}
              style={styles.btn}
              isPending={isLoading}
              disabled={isActiveTimer}
              label="Получить СМС с кодом"
            />
          </FormProvider>
          {!!phoneTimeout && (
            <TimerBlockPhoneProfile
              expiredTimer={Number(phoneTimeout?.timeout * 1000)}
            />
          )}
        </View>
      </DismissKeyboardView>
    </View>
  );
};

export default PhoneEditingScreen;
