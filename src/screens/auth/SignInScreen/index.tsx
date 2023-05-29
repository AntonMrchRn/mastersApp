import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';

import AgreementCheckBox from '@/components/auth/AgreementCheckBox';
import ButtonAuth from '@/components/auth/ButtonAuth';
import ForgotPassword from '@/components/auth/ForgotPassword';
import Input from '@/components/auth/Input/Input';
import InputPassword from '@/components/auth/Input/InputPassword';
import LogoPreview from '@/components/auth/LogoPreview';
import TypeSelection from '@/components/auth/TypeSelection';
import { configApp, deviceHeight } from '@/constants/platform';

import useSignInScreen from './useSignInScreen';

import styles from './style';

const SignInScreen = () => {
  const {
    tel,
    email,
    setTel,
    setEmail,
    isActive,
    password,
    focusInput,
    authRequest,
    isPhoneAuth,
    setIsActive,
    setPassword,
    passwordRef,
    scrollViewRef,
    setIsPhoneAuth,
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
            <TypeSelection
              setIsPhoneAuth={setIsPhoneAuth}
              isPhoneAuth={isPhoneAuth}
              setTel={setTel}
              setEmail={setEmail}
              setIsActive={setIsActive}
            />
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
            <InputPassword
              password={password}
              setPassword={setPassword}
              innerRef={passwordRef}
            />
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
              flag={true}
              isPhoneAuth={isPhoneAuth}
              tel={tel}
              password={password}
              email={email}
              isDisabled
              onPress={authRequest}
              valueCheckBox={isAgreeWithTerms}
              label={'Продолжить'}
            />
            <ForgotPassword />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignInScreen;
