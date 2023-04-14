import { useNavigation } from '@react-navigation/native';
import React, { createRef, useEffect, useState } from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

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
}) => {
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
    await dispatch(recoveryPassword({ tel, email, isPhoneAuth }));
  };

  const restoreRequest = () => {
    dispatch(restorePassword({ password, value })).then(res => {
      if (res?.payload === null || res?.payload === undefined) {
        dispatch(clearRecoveryError());
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
      scrollViewRef?.current?.scrollToPosition(0, OFFSET, true);
    }, 0);
  };

  const passwordRef = createRef();
  const scrollViewRef = createRef();

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
          <CodeFieldInput
            value={value}
            setValue={setValue}
            onSubmitEditing={() => passwordRef?.current?.focus()}
            onFocus={configApp.ios ? focusInput : () => {}}
          />
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
