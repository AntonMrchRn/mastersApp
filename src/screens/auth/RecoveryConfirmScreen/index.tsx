import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';

import ButtonAuth from '@/components/auth/ButtonAuth';
import CodeFieldInput from '@/components/auth/CodeFieldInput';
import ConfirmPreview from '@/components/auth/ConfirmPreview';
import InputPassword from '@/components/auth/Input/InputPassword';
import LogoPreview from '@/components/auth/LogoPreview';
import TimerBlock from '@/components/auth/Timer/TimerBlock';
import Spacer from '@/components/Spacer';
import { configApp } from '@/constants/platform';

import useRecoveryConfirmationScreen from './useRecoveryConfirmationScreen';

import styles from './style';

const RecoveryConfirmationScreen = () => {
  const {
    value,
    email,
    timeout,
    password,
    setValue,
    focusInput,
    isPhoneAuth,
    setPassword,
    passwordRef,
    scrollViewRef,
    recoveryError,
    restoreRequest,
    recoveryRequest,
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
          <ConfirmPreview />
          <Spacer />
          <View style={styles.wrapperCode}>
            <CodeFieldInput
              value={value}
              setValue={setValue}
              onSubmitEditing={() => passwordRef?.current?.focus()}
              onFocus={configApp.ios ? focusInput : () => null}
            />
          </View>
          <InputPassword
            password={password}
            setPassword={setPassword}
            innerRef={passwordRef}
            label="Новый пароль"
          />
          <Spacer size="L" />
          <ButtonAuth
            isRestore
            isPhoneAuth={isPhoneAuth}
            value={value}
            password={password}
            email={email}
            label="Изменить пароль"
            isDisabled
            withOutPassword
            recoveryError={recoveryError}
            onPress={restoreRequest}
          />
          {!!timeout && (
            <TimerBlock
              expiredTimer={Number(timeout?.timeout * 1000)}
              isConfirm
              callBack={recoveryRequest}
            />
          )}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default RecoveryConfirmationScreen;
