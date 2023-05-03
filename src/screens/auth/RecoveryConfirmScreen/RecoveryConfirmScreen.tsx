import { useNavigation } from '@react-navigation/native';
import React, { createRef, useEffect, useState } from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

// @ts-expect-error TS(2307): Cannot find module '~/components' or its correspon... Remove this comment to see the full error message
import { InputPassword } from '~/components';
import { ButtonAuth } from '../../../components/auth/ButtonAuth/ButtonAuth';
import CodeFieldInput from '../../../components/auth/CodeField/CodeField';
import ConfrimPreview from '../../../components/auth/ConfirmPreview/ConfirmPreview';
import LogoPreview from '../../../components/auth/LogoPreview';
import { TimerBlock } from '../../../components/auth/Timer/Timer';
import Header from '../../../components/Header/Header';
import Spacer from '../../../components/Spacer/Spacer';
import {
  recoveryPassword,
  restorePassword,
} from '../../../redux/slices/auth/asyncActions';
import { clearRecoveryError } from '../../../redux/slices/auth/reducer';
import { configApp } from '../../../utils/helpers/platform';

import { styles } from './style';

export const RecoveryConfirmationScreen = ({
  route: {
    params: { tel },
  },
}: any) => {
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const { timeout, recoveryError } = useSelector(state => state.auth);

  const [isPhoneAuth, setIsPhoneAuth] = useState(true);
  const [email, seteMail] = useState('');
  const [value, setValue] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const goBack = () => {
    dispatch(clearRecoveryError());
    navigation.goBack();
  };

  const recoveryRequest = async () => {
    // @ts-expect-error TS(2345): Argument of type 'AsyncThunkAction<{ data: any; is... Remove this comment to see the full error message
    await dispatch(recoveryPassword({ tel, email, isPhoneAuth }));
  };

  const restoreRequest = () => {
    // @ts-expect-error TS(2345): Argument of type 'AsyncThunkAction<any, void, Asyn... Remove this comment to see the full error message
    dispatch(restorePassword({ password, value })).then((res: any) => {
      if (res?.payload === null || res?.payload === undefined) {
        dispatch(clearRecoveryError());
        // @ts-expect-error TS(2769): No overload matches this call.
        navigation.navigate('PasswordScreen');
      }
    });
  };

  useEffect(() => {
    dispatch(clearRecoveryError());
  }, []);

  useEffect(() => {
    dispatch(clearRecoveryError());
  }, [password, value]);

  const OFFSET = 0;

  const focusInput = () => {
    setTimeout(() => {
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      scrollViewRef?.current?.scrollToPosition(0, OFFSET, true);
    }, 0);
  };

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
          <LogoPreview label="Восстановление пароля" height={135} />
          <ConfrimPreview />
          <Spacer />
          <View style={styles.wrapperCode}>
            <CodeFieldInput
              value={value}
              setValue={setValue}
              // @ts-expect-error TS(2571): Object is of type 'unknown'.
              onSubmitEditing={() => passwordRef?.current?.focus()}
              onFocus={configApp.ios ? focusInput : () => {}}
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
          // @ts-expect-error TS(2786): 'TimerBlock' cannot be used as a JSX
          component.
          <TimerBlock
            expiredTimer={Number(timeout?.timeout * 1000)}
            isConfirm
            callBack={recoveryRequest}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
