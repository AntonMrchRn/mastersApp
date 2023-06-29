import React from 'react';
import { FormProvider } from 'react-hook-form';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import normalize from 'react-native-normalize';

import { Button, SegmentedControl, Spacer } from 'rn-ui-kit';

import ForgotPreview from '@/components/auth/ForgotPreview';
import LogoPreview from '@/components/auth/LogoPreview';
import Header from '@/components/Header';
import ControlledInput from '@/components/inputs/ControlledInput';
import ControlledInputPhone from '@/components/inputs/ControlledInputPhone';
import TimerBlockEmailAuth from '@/components/Timer/TimerBlockEmailAuth';
import TimerBlockPhoneAuth from '@/components/Timer/TimerBlockPhoneAuth';
import { configApp } from '@/constants/platform';

import useRecovery from './useRecovery';

import styles from './style';

const RecoveryScreen = () => {
  const {
    errors,
    methods,
    onFocus,
    sendCode,
    switchTab,
    isLoading,
    isDisabled,
    isPhoneAuth,
    isInvalidEmail,
    phoneTimeout,
    emailTimeout,
    scrollViewRef,
    onKeyboardWillShow,
  } = useRecovery();

  return (
    <View style={styles.container}>
      <Header />
      <KeyboardAwareScrollView
        ref={scrollViewRef}
        enableOnAndroid={true}
        keyboardOpeningTime={100}
        keyboardShouldPersistTaps="handled"
        onKeyboardWillShow={onKeyboardWillShow}
      >
        <View style={styles.wrapperSignIn}>
          <LogoPreview
            label="Восстановление пароля"
            height={configApp.ios ? 135 : normalize(175, 'height')}
          />
          <Spacer size="xs" />
          <ForgotPreview />
          <SegmentedControl onChange={switchTab} tabs={['Телефон', 'Email']} />
          <Spacer size="xl" />
          <FormProvider {...methods}>
            {isPhoneAuth ? (
              <ControlledInputPhone
                name="phone"
                hint={errors.phone?.message}
                containerStyle={styles.input}
                isError={!!errors.phone?.message}
                onFocus={configApp.ios ? onFocus : () => null}
              />
            ) : (
              <ControlledInput
                name="email"
                maxLength={60}
                variant="text"
                autoCapitalize="none"
                keyboardType="email-address"
                containerStyle={styles.input}
                placeholder="Электронная почта"
                onFocus={configApp.ios ? onFocus : () => null}
                isError={!!errors.email?.message && !isInvalidEmail}
                hint={isInvalidEmail ? undefined : errors.email?.message}
              />
            )}
            <Spacer size="xl" />
            <Button
              onPress={sendCode}
              style={styles.btn}
              disabled={isDisabled}
              isPending={isLoading}
              label={isPhoneAuth ? 'Получить СМС с кодом' : 'Получить ссылку'}
            />
          </FormProvider>
          <View style={styles.containerTimer}>
            {isPhoneAuth
              ? !!phoneTimeout && (
                  <TimerBlockPhoneAuth
                    expiredTimer={Number(phoneTimeout?.timeout * 1000)}
                  />
                )
              : !!emailTimeout && (
                  <TimerBlockEmailAuth
                    expiredTimer={Number(emailTimeout?.timeout * 1000)}
                  />
                )}
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default RecoveryScreen;
