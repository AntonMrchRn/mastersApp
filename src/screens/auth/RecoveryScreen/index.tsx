import React from 'react';
import { FormProvider } from 'react-hook-form';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import normalize from 'react-native-normalize';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, SegmentedControl, Spacer } from 'rn-ui-kit';

import ForgotPreview from '@/components/auth/ForgotPreview';
import LogoPreview from '@/components/auth/LogoPreview';
import TimerBlockEmail from '@/components/auth/Timer/TimerBlockEmail';
import TimerBlockPhone from '@/components/auth/Timer/TimerBlockPhone';
import ControlledInput from '@/components/ControlledInput';
import ControlledInputPhone from '@/components/ControlledInputPhone';
import { configApp } from '@/constants/platform';

import useRecoveryScreen from './useRecoveryScreen';

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
    timeoutPhone,
    timeoutEmail,
    scrollViewRef,
    onKeyboardWillShow,
  } = useRecoveryScreen();

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
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
              ? !!timeoutPhone && (
                  <TimerBlockPhone
                    expiredTimer={Number(timeoutPhone?.timeout * 1000)}
                  />
                )
              : !!timeoutEmail && (
                  <TimerBlockEmail
                    expiredTimer={Number(timeoutEmail?.timeout * 1000)}
                  />
                )}
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default RecoveryScreen;
