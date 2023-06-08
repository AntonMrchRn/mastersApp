import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import normalize from 'react-native-normalize';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Input, InputPhone, SegmentedControl, Spacer } from 'rn-ui-kit';

import ButtonAuth from '@/components/auth/ButtonAuth';
import ForgotPreview from '@/components/auth/ForgotPreview';
import LogoPreview from '@/components/auth/LogoPreview';
import TimerBlockEmail from '@/components/auth/Timer/TimerBlockEmail';
import TimerBlockPhone from '@/components/auth/Timer/TimerBlockPhone';
import { configApp } from '@/constants/platform';

import useRecoveryScreen from './useRecoveryScreen';

import styles from './style';

const RecoveryScreen = () => {
  const {
    phone,
    email,
    error,
    onFocus,
    sendCode,
    setPhone,
    setEmail,
    password,
    switchTab,
    isLoading,
    isPhoneAuth,
    timeoutPhone,
    timeoutEmail,
    isPhoneError,
    isEmailError,
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
          {isPhoneAuth ? (
            <InputPhone
              isError={isPhoneError}
              value={phone}
              onClear={() => setPhone('')}
              containerStyle={styles.input}
              hint={isPhoneError ? error?.message : undefined}
              onFocus={configApp.ios ? onFocus : () => null}
              onChangeText={(_, unmasked) => setPhone(unmasked)}
            />
          ) : (
            <Input
              value={email}
              variant="text"
              autoCapitalize="none"
              isError={isEmailError}
              keyboardType="email-address"
              onClear={() => setEmail('')}
              containerStyle={styles.input}
              placeholder="Электронная почта"
              hint={isEmailError ? error?.message : undefined}
              onChangeText={(email: string) => setEmail(email)}
              onFocus={configApp.ios ? onFocus : () => null}
            />
          )}
          <Spacer size="xl" />
          <ButtonAuth
            isDisabled
            phone={phone}
            email={email}
            withOutPassword
            onPress={sendCode}
            password={password}
            isLoading={isLoading}
            isPhoneAuth={isPhoneAuth}
            label={isPhoneAuth ? 'Получить СМС с кодом' : 'Получить ссылку'}
          />
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
