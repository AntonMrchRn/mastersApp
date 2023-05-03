import { useNavigation } from '@react-navigation/native';
import React, { createRef, useEffect, useState } from 'react';
import { Keyboard, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import normalize from 'react-native-normalize';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

// @ts-expect-error TS(2307): Cannot find module '~/components' or its correspon... Remove this comment to see the full error message
import { Input, TypeSelection } from '~/components';
import { ButtonAuth } from '../../../components/auth/ButtonAuth/ButtonAuth';
import ForgotPreview from '../../../components/auth/ForgotPreview/ForgotPreview';
import LogoPreview from '../../../components/auth/LogoPreview';
import { TimerBlock } from '../../../components/auth/Timer/Timer';
import { TimerBlockEmail } from '../../../components/auth/TimerEmail/TimerEmail';
import Header from '../../../components/Header/Header';
import Spacer from '../../../components/Spacer/Spacer';
import { recoveryPassword } from '../../../redux/slices/auth/asyncActions';
import { clearRecoveryError } from '../../../redux/slices/auth/reducer';
import { configApp } from '../../../utils/helpers/platform';

import { styles } from './style';

export const RecoveryScreen = () => {
  const { isRecovery, timeout, timeOutEmail, isRecoveryEmail } = useSelector(
    // @ts-expect-error TS(2571): Object is of type 'unknown'.
    state => state.auth
  );
  const [isPhoneAuth, setIsPhoneAuth] = useState(true);
  const [tel, setTel] = useState('');
  const [email, seteMail] = useState('');
  const [password, setPassword] = useState('');
  const [active, setActive] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const recoveryRequest = async () => {
    // @ts-expect-error TS(2345): Argument of type 'AsyncThunkAction<{ data: any; is... Remove this comment to see the full error message
    await dispatch(recoveryPassword({ tel, email, isPhoneAuth, navigation }));
  };

  useEffect(() => {
    dispatch(clearRecoveryError());
  }, []);

  const goBack = () => {
    dispatch(clearRecoveryError());
    navigation.goBack();
  };

  useEffect(() => {
    if (isRecovery && isPhoneAuth && !isRecoveryEmail) {
      // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
      navigation.navigate('RecoveryConfirmScreen', { tel: tel });
      dispatch(clearRecoveryError());
    }
    if (!isPhoneAuth) {
      Keyboard.dismiss();
      // @ts-expect-error TS(2769): No overload matches this call.
      navigation.navigate('EmailScreen');
    }
  }, [isRecovery, isRecoveryEmail]);

  const OFFSET = 0;

  const focusInput = () => {
    setTimeout(() => {
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      scrollViewRef?.current?.scrollToPosition(0, OFFSET, true);
    }, 200);
  };

  useEffect(() => {
    if (tel?.length === 10) {
      Keyboard.dismiss();
    }
  }, [tel]);

  const passwordRef = createRef();
  const scrollViewRef = createRef();

  return (
    <SafeAreaView style={styles.container}>
      <Header callBack={goBack} />
      <KeyboardAwareScrollView
        // @ts-expect-error TS(2769): No overload matches this call.
        ref={scrollViewRef}
        keyboardShouldPersistTaps="handled"
        onKeyboardWillShow={() => {
          if (configApp.android) {
            return;
          }
          setTimeout(() => {
            // @ts-expect-error TS(2571): Object is of type 'unknown'.
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
            // @ts-expect-error TS(2571): Object is of type 'unknown'.
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
              // @ts-expect-error TS(2786): 'TimerBlock' cannot be used as a JSX component.
              <TimerBlock expiredTimer={Number(timeout?.timeout * 1000)} />
            ) : (
              // @ts-expect-error TS(2786): 'TimerBlockEmail' cannot be used as a JSX componen... Remove this comment to see the full error message
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
