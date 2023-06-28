import React from 'react';
import { FormProvider } from 'react-hook-form';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, Spacer, Text, useTheme } from 'rn-ui-kit';

import ControlledInputCode from '@/components/ControlledInputCode';
import Header from '@/components/Header';
import TimerBlockPhoneProfile from '@/components/Timer/TimerBlockPhoneProfile';
import { DismissKeyboardView } from '@/hocs/DismissKeyboardView';
import usePhoneEditingConfirmation from '@/screens/tabs/PhoneEditingConfirmationScreen/usePhoneEditingConfirmation';

import styles from './style';

const PhoneEditingConfirmationScreen = () => {
  const theme = useTheme();
  const {
    errors,
    methods,
    sendCode,
    isLoading,
    isDisabled,
    phoneTimeout,
    confirmPhone,
    isPhoneExist,
  } = usePhoneEditingConfirmation();

  return (
    <SafeAreaView style={styles.container}>
      <DismissKeyboardView>
        <Header
          title={`${isPhoneExist ? 'Изменение' : 'Добавление'} телефона`}
        />
        <View style={styles.content}>
          <Spacer size="xxl" />
          <Text variant="title3" style={styles.title}>
            Подтверждение телефона
          </Text>
          <Spacer />
          <Text variant="bodyMRegular" color={theme.text.neutral}>
            Мы отправили вам смс с 6-значным кодом. Пожалуйста, введите код
          </Text>
          <Spacer size="xl" />
          <FormProvider {...methods}>
            <ControlledInputCode
              name="code"
              hint={errors.code?.message}
              rootStyle={styles.inputCode}
            />
            <Spacer size={errors.code?.message ? 'xl' : 'xxl'} />
            <Button
              // style={styles.btn}
              disabled={isDisabled}
              isPending={isLoading}
              label="Подтвердить телефон"
              onPress={confirmPhone}
            />
          </FormProvider>
          {!!phoneTimeout && (
            <TimerBlockPhoneProfile
              isConfirm
              callBack={sendCode}
              expiredTimer={Number(phoneTimeout?.timeout) * 1000}
            />
          )}
        </View>
      </DismissKeyboardView>
    </SafeAreaView>
  );
};

export default PhoneEditingConfirmationScreen;
