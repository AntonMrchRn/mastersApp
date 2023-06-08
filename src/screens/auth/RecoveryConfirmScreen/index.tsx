import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Input, InputCode, Spacer } from 'rn-ui-kit';

import ButtonAuth from '@/components/auth/ButtonAuth';
import ConfirmPreview from '@/components/auth/ConfirmPreview';
import LogoPreview from '@/components/auth/LogoPreview';
import TimerBlockPhone from '@/components/auth/Timer/TimerBlockPhone';
import ErrorField from '@/components/ErrorField';
import { configApp } from '@/constants/platform';

import useRecoveryConfirmationScreen from './useRecoveryConfirmationScreen';

import styles from './style';

const RecoveryConfirmationScreen = () => {
  const {
    code,
    email,
    error,
    setCode,
    onFocus,
    password,
    sendCode,
    isLoading,
    setPassword,
    isCodeError,
    passwordRef,
    timeoutPhone,
    scrollViewRef,
    isPasswordError,
    restorePassword,
    onKeyboardWillShow,
  } = useRecoveryConfirmationScreen();

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
          <LogoPreview label="Восстановление пароля" height={135} />
          <Spacer size="xs" />
          <ConfirmPreview />
          <Spacer size="m" />
          <InputCode
            value={code}
            onChangeText={(code: string) => setCode(code)}
            onSubmitEditing={() => passwordRef?.current?.focus()}
            onFocus={configApp.ios ? onFocus : () => null}
          />
          {isCodeError && error && <ErrorField error={error.message} />}
          <Spacer size="xxl" />
          <Input
            value={password}
            ref={passwordRef}
            variant="password"
            containerStyle={styles.inputContainer}
            style={styles.input}
            placeholder="Новый пароль"
            maxLength={64}
            onChangeText={setPassword}
            hint={isPasswordError ? error?.message : undefined}
            isError={isPasswordError}
          />
          <Spacer size="xl" />
          <ButtonAuth
            isRestore
            isDisabled
            value={code}
            email={email}
            withOutPassword
            isPhoneAuth={true}
            password={password}
            isLoading={isLoading}
            label="Изменить пароль"
            onPress={restorePassword}
            recoveryError={error?.message}
          />
          {!!timeoutPhone && (
            <TimerBlockPhone
              isConfirm
              callBack={sendCode}
              expiredTimer={Number(timeoutPhone?.timeout) * 1000}
            />
          )}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default RecoveryConfirmationScreen;
