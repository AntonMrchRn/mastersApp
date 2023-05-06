import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { InputPassword } from '../../../components';

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
import { useAppDispatch, useAppSelector } from '../../../utils/hooks/useRedux';

import { styles } from './style';

export const RecoveryConfirmationScreen = ({
  route: {
    params: { tel },
  },
}: any) => {
  const { timeout, recoveryError } = useAppSelector((state: any) => state.auth);
  const [value, setValue] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();
  const navigation: any = useNavigation();

  const goBack = () => {
    dispatch(clearRecoveryError());
    navigation.goBack();
  };

  const isPhoneAuth = true;

  const email = '';

  const recoveryRequest = async () => {
    await dispatch(recoveryPassword({ tel, email, isPhoneAuth }));
  };

  const restoreRequest = () => {
    dispatch(restorePassword({ password, value })).then((res: any) => {
      if (res?.payload === null || res?.payload === undefined) {
        dispatch(clearRecoveryError());
        navigation.navigate('Password');
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
      scrollViewRef?.current?.scrollToPosition(0, OFFSET, true);
    }, 0);
  };

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
          <LogoPreview label="Восстановление пароля" height={135} />
          <ConfrimPreview />
          <Spacer />
          <View style={styles.wrapperCode}>
            <CodeFieldInput
              value={value}
              setValue={setValue}
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
