import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import normalize from 'react-native-normalize';
import { SafeAreaView } from 'react-native-safe-area-context';

import ButtonAuth from '@/components/auth/ButtonAuth';
import ForgotPreview from '@/components/auth/ForgotPreview';
import Input from '@/components/auth/Input/Input';
import LogoPreview from '@/components/auth/LogoPreview';
import TimerBlock from '@/components/auth/Timer/TimerBlock';
import TimerBlockEmail from '@/components/auth/Timer/TimerBlockEmail';
import TypeSelection from '@/components/auth/TypeSelection';
import Spacer from '@/components/Spacer';
import { configApp } from '@/constants/platform';

import useRecoveryScreen from './useRecoveryScreen';

import styles from './style';

const RecoveryScreen = () => {
  const {
    tel,
    email,
    setTel,
    timeout,
    setEmail,
    password,
    isActive,
    focusInput,
    setIsActive,
    isPhoneAuth,
    passwordRef,
    timeOutEmail,
    scrollViewRef,
    setIsPhoneAuth,
    recoveryRequest,
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
          <ForgotPreview />
          <TypeSelection
            setIsPhoneAuth={setIsPhoneAuth}
            isPhoneAuth={isPhoneAuth}
            setTel={setTel}
            setEmail={setEmail}
            setIsActive={setIsActive}
          />
          <Spacer />
          <Input
            isPhoneAuth={isPhoneAuth}
            tel={tel}
            email={email}
            setEmail={setEmail}
            setTel={setTel}
            onSubmitEditing={() => passwordRef?.current?.focus()}
            onFocus={configApp.ios ? focusInput : () => null}
            setIsActive={setIsActive}
            isActive={isActive}
          />
          <Spacer size="L" />
          <ButtonAuth
            isPhoneAuth={isPhoneAuth}
            tel={tel}
            password={password}
            email={email}
            label={isPhoneAuth ? 'Получить СМС с кодом' : 'Получить ссылку'}
            isDisabled
            withOutPassword
            onPress={recoveryRequest}
          />
          <View style={styles.containerTimer}>
            {isPhoneAuth
              ? !!timeout && (
                  <TimerBlock expiredTimer={Number(timeout?.timeout * 1000)} />
                )
              : !!timeOutEmail && (
                  <TimerBlockEmail
                    expiredTimer={Number(timeOutEmail?.timeout * 1000)}
                  />
                )}
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default RecoveryScreen;