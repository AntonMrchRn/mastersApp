import React from 'react';
import { FormProvider } from 'react-hook-form';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, Spacer } from 'rn-ui-kit';

import ConfirmPreview from '@/components/auth/ConfirmPreview';
import LogoPreview from '@/components/auth/LogoPreview';
import Header from '@/components/Header';
import ControlledInputCode from '@/components/inputs/ControlledInputCode';
import ControlledInput from '@/components/inputs/ControlledInput';
import TimerBlockPhoneAuth from '@/components/Timer/TimerBlockPhoneAuth';
import { configApp } from '@/constants/platform';

import useRecoveryConfirmation from './useRecoveryConfirmation';

import styles from './style';

const RecoveryConfirmationScreen = () => {
  const {
    errors,
    methods,
    onFocus,
    sendCode,
    isLoading,
    isDisabled,
    phoneTimeout,
    scrollViewRef,
    restorePassword,
    onKeyboardWillShow,
  } = useRecoveryConfirmation();

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <KeyboardAwareScrollView
        ref={scrollViewRef}
        enableOnAndroid={true}
        keyboardOpeningTime={100}
        keyboardShouldPersistTaps="handled"
        onKeyboardWillShow={onKeyboardWillShow}
      >
        <View style={styles.wrapperSignIn}>
          <LogoPreview label="Восстановление пароля" height={135} />
          <Spacer size="xs" />
          <ConfirmPreview />
          <Spacer size="m" />
          <FormProvider {...methods}>
            <ControlledInputCode
              name="code"
              hint={errors.code?.message}
              onFocus={configApp.ios ? onFocus : () => null}
              onSubmitEditing={() => methods.setFocus('password')}
            />
            <Spacer size={errors.code?.message ? 'xl' : 'xxl'} />
            <ControlledInput
              name="password"
              maxLength={64}
              variant="password"
              style={styles.input}
              placeholder="Новый пароль"
              containerStyle={styles.inputContainer}
              isError={!!errors.password?.message}
              hint={errors.password?.message}
            />
            <Spacer size="xl" />
            <Button
              style={styles.btn}
              disabled={isDisabled}
              isPending={isLoading}
              label="Изменить пароль"
              onPress={restorePassword}
            />
          </FormProvider>
          {!!phoneTimeout && (
            <TimerBlockPhoneAuth
              isConfirm
              callBack={sendCode}
              expiredTimer={Number(phoneTimeout?.timeout) * 1000}
            />
          )}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default RecoveryConfirmationScreen;
