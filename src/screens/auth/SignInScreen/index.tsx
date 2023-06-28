import React from 'react';
import { FormProvider } from 'react-hook-form';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, SegmentedControl, Spacer } from 'rn-ui-kit';

import AgreementCheckBox from '@/components/auth/AgreementCheckBox';
import ForgotPassword from '@/components/auth/ForgotPassword';
import LogoPreview from '@/components/auth/LogoPreview';
import ControlledInput from '@/components/inputs/ControlledInput';
import ControlledInputPhone from '@/components/inputs/ControlledInputPhone';
import { configApp, deviceHeight } from '@/constants/platform';

import useSignInScreen from './useSignIn';

import styles from './style';

const SignInScreen = () => {
  const {
    logIn,
    errors,
    methods,
    onFocus,
    switchTab,
    isLoading,
    isDisabled,
    isPhoneAuth,
    isInvalidEmail,
    scrollViewRef,
    onKeyboardWillShow,
  } = useSignInScreen();

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        ref={scrollViewRef}
        enableOnAndroid={true}
        keyboardOpeningTime={100}
        keyboardShouldPersistTaps="handled"
        onKeyboardWillShow={onKeyboardWillShow}
      >
        <View style={styles.wrapperSignIn}>
          <LogoPreview
            label={'Войдите в систему'}
            height={configApp.android && deviceHeight < 593 ? 145 : 165}
          />
          <FormProvider {...methods}>
            <View
              style={[
                styles.wrapperCenter,
                configApp.android && deviceHeight < 593 && styles.androidHeight,
              ]}
            >
              <SegmentedControl
                onChange={switchTab}
                tabs={['Телефон', 'Email']}
              />
              <Spacer size="xl" />
              {isPhoneAuth ? (
                <ControlledInputPhone
                  name="phone"
                  hint={errors.phone?.message}
                  isError={!!errors.phone?.message}
                  onFocus={configApp.ios ? onFocus : () => null}
                  onSubmitEditing={() => methods.setFocus('password')}
                />
              ) : (
                <ControlledInput
                  name="email"
                  variant="text"
                  maxLength={60}
                  style={styles.input}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  placeholder="Электронная почта"
                  onFocus={configApp.ios ? onFocus : () => null}
                  isError={!!errors.email?.message && !isInvalidEmail}
                  hint={isInvalidEmail ? undefined : errors.email?.message}
                  onSubmitEditing={() => methods.setFocus('password')}
                />
              )}
              <Spacer size="l" />
              <ControlledInput
                name="password"
                maxLength={64}
                variant="password"
                placeholder="Пароль"
                style={styles.input}
                isError={!!errors.password?.message}
                hint={errors.password?.message}
              />
              <Spacer size="xl" />
              <AgreementCheckBox />
            </View>
            <View
              style={[
                styles.bottomWrapper,
                configApp.android &&
                  deviceHeight < 593 &&
                  styles.marginTopAndroid,
              ]}
            >
              <Button
                onPress={logIn}
                style={styles.btn}
                label="Продолжить"
                disabled={isDisabled}
                isPending={isLoading}
              />
              <Spacer size="xl" />
              <ForgotPassword />
            </View>
          </FormProvider>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignInScreen;
