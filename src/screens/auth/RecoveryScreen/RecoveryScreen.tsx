import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Keyboard, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import normalize from 'react-native-normalize';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input, TypeSelection } from '../../../components';
import { ButtonAuth } from '../../../components/auth/ButtonAuth/ButtonAuth';
import ForgotPreview from '../../../components/auth/ForgotPreview/ForgotPreview';
import LogoPreview from '../../../components/auth/LogoPreview';
import { TimerBlock } from '../../../components/auth/Timer/Timer';
import { TimerBlockEmail } from '../../../components/auth/TimerEmail/TimerEmail';
import Header from '../../../components/Header/Header';
import Spacer from '../../../components/Spacer/Spacer';
import { recoveryPassword } from '../../../redux/slices/auth/asyncActions';
import {
  clearAuthError,
  clearRecoveryError,
} from '../../../redux/slices/auth/reducer';
import { configApp } from '../../../utils/helpers/platform';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks/useRedux';

import { styles } from './style';

export const RecoveryScreen = () => {
  const { isRecovery, timeout, timeOutEmail, isRecoveryEmail } = useAppSelector(
    (state: any) => state.auth
  );
  const [isPhoneAuth, setIsPhoneAuth] = useState<boolean>(true);
  const [tel, setTel] = useState('');
  const [email, seteMail] = useState('');
  const [active, setActive] = useState(false);

  const dispatch = useAppDispatch();
  const navigation: any = useNavigation();

  const recoveryRequest = async () => {
    await dispatch(recoveryPassword({ tel, email, isPhoneAuth, navigation }));
  };

  useEffect(() => {
    dispatch(clearRecoveryError());
    dispatch(clearAuthError(null));
  }, []);

  const goBack = () => {
    dispatch(clearRecoveryError());
    dispatch(clearAuthError(null));
    navigation.goBack();
  };

  useEffect(() => {
    if (isRecovery && isPhoneAuth && !isRecoveryEmail) {
      navigation.navigate('RecoveryConfirm', { tel: tel });
      dispatch(clearRecoveryError());
    }
    if (!isPhoneAuth) {
      Keyboard.dismiss();
      navigation.navigate('Email');
    }
  }, [isRecovery, isRecoveryEmail]);

  const OFFSET = 0;

  const password = '';

  const focusInput = () => {
    setTimeout(() => {
      scrollViewRef?.current?.scrollToPosition(0, OFFSET, true);
    }, 200);
  };

  useEffect(() => {
    if (tel?.length === 10) {
      Keyboard.dismiss();
    }
  }, [tel]);

  const passwordRef = useRef<TextInput>(null);
  const scrollViewRef = useRef<KeyboardAwareScrollView>(null);

  return (
    <SafeAreaView style={styles.container}>
      <Header callBack={goBack} />
      <KeyboardAwareScrollView
        ref={scrollViewRef}
        keyboardShouldPersistTaps="handled"
        onKeyboardWillShow={() => {
          if (configApp.android) {
            return;
          }
          setTimeout(() => {
            scrollViewRef?.current?.scrollToPosition(0, OFFSET, true);
          }, 200);
        }}
        keyboardOpeningTime={100}
        enableOnAndroid={true}
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
            seteMail={seteMail}
            setActive={setActive}
          />
          <Spacer />
          <Input
            isPhoneAuth={isPhoneAuth}
            tel={tel}
            email={email}
            setMail={seteMail}
            setTel={setTel}
            onSubmitEditing={() => passwordRef?.current?.focus()}
            onFocus={configApp.ios ? focusInput : () => {}}
            setActive={setActive}
            active={active}
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
            {isPhoneAuth ? (
              <TimerBlock expiredTimer={Number(timeout?.timeout * 1000)} />
            ) : (
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
