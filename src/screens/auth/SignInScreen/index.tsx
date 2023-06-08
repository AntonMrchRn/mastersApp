import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Input, InputPhone, SegmentedControl, Spacer } from 'rn-ui-kit';

import AgreementCheckBox from '@/components/auth/AgreementCheckBox';
import ButtonAuth from '@/components/auth/ButtonAuth';
import ForgotPassword from '@/components/auth/ForgotPassword';
import LogoPreview from '@/components/auth/LogoPreview';
import { configApp, deviceHeight } from '@/constants/platform';

import useSignInScreen from './useSignInScreen';

import styles from './style';

const SignInScreen = () => {
  const {
    phone,
    email,
    logIn,
    error,
    onFocus,
    setPhone,
    setEmail,
    password,
    switchTab,
    isLoading,
    setPassword,
    passwordRef,
    isPhoneAuth,
    isPhoneError,
    isEmailError,
    scrollViewRef,
    isPasswordError,
    isAgreeWithTerms,
    onKeyboardWillShow,
    setIsAgreeWithTerms,
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
              <InputPhone
                isError={isPhoneError}
                value={phone}
                onClear={() => setPhone('')}
                hint={isPhoneError ? error?.message : undefined}
                onFocus={configApp.ios ? onFocus : () => null}
                onSubmitEditing={() => passwordRef?.current?.focus()}
                onChangeText={(_, unmasked) => setPhone(unmasked)}
              />
            ) : (
              <Input
                value={email}
                variant="text"
                maxLength={60}
                autoCapitalize="none"
                isError={isEmailError}
                keyboardType="email-address"
                placeholder="Электронная почта"
                style={styles.input}
                onClear={() => setEmail('')}
                hint={isEmailError ? error?.message : undefined}
                onChangeText={(email: string) => setEmail(email)}
                onFocus={configApp.ios ? onFocus : () => null}
                onSubmitEditing={() => passwordRef?.current?.focus()}
              />
            )}
            <Spacer size="l" />
            <Input
              value={password}
              ref={passwordRef}
              variant="password"
              style={styles.input}
              placeholder="Пароль"
              maxLength={64}
              isError={isPasswordError}
              onChangeText={setPassword}
              hint={isPasswordError ? error?.message : undefined}
            />
            <Spacer size="xl" />
            <AgreementCheckBox
              value={isAgreeWithTerms}
              setValue={setIsAgreeWithTerms}
            />
          </View>
          <View
            style={[
              styles.bottomWrapper,
              configApp.android &&
                deviceHeight < 593 &&
                styles.marginTopAndroid,
            ]}
          >
            <ButtonAuth
              flag
              isDisabled
              email={email}
              phone={phone}
              onPress={logIn}
              password={password}
              isLoading={isLoading}
              isPhoneAuth={isPhoneAuth}
              authError={error?.message}
              valueCheckBox={isAgreeWithTerms}
              label={'Продолжить'}
            />
            <Spacer size={'xl'} />
            <ForgotPassword />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignInScreen;
