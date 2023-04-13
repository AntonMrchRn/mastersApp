import { useNavigation } from '@react-navigation/native';
import React, { createRef, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import { InputPassword } from '~/components';
import { ButtonAuth } from '../../../components/auth/ButtonAuth/ButtonAuth';
import CodeFieldInput from '../../../components/auth/CodeField/CodeField';
import ConfrimPreview from '../../../components/auth/ConfirmPreview/ConfirmPreview';
import ModalComponentScreen from '../../../components/auth/ModalComponentAuth';
import { TimerBlock } from '../../../components/auth/Timer/Timer';
import Header from '../../../components/Header/Header';
import Spacer from '../../../components/Spacer/Spacer';
import {
  recoveryPassword,
  restorePassword,
} from '../../../redux/slices/auth/asyncActions';
import {
  clearRecoveryError,
  modalVisible,
} from '../../../redux/slices/auth/reducer';
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
        dispatch(modalVisible(true));
      }
    });
  };

  const closeModal = () => {
    navigation.navigate('SignUpScreen');
    dispatch(modalVisible(false));
  };

  const { visible } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(clearRecoveryError());
  }, []);

  useEffect(() => {
    dispatch(clearRecoveryError());
  }, [password, value]);

  const OFFSET = 120;

  const focusInput = () => {
    setTimeout(() => {
      scrollViewRef?.current?.scrollToPosition(0, OFFSET, true);
    }, 0);
  };

  const passwordRef = createRef();
  const scrollViewRef = createRef();

  return (
    <SafeAreaView style={styles.container}>
      <Header label={'Подтверждение кодом'} callBack={goBack} />
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
        contentContainerStyle={styles.containerKeyboard}
        enableOnAndroid={true}
      >
        <View style={styles.wrapperSignIn}>
          <ConfrimPreview />
          <Spacer />
          <CodeFieldInput
            value={value}
            setValue={setValue}
            onSubmitEditing={() => passwordRef?.current?.focus()}
            onFocus={configApp.ios ? focusInput : () => {}}
          />
          <ModalComponentScreen
            flag={true}
            visible={visible}
            label="Вы успешно поменяли пароль!"
            textBtn="Готово"
            onPress={closeModal}
          />
          <InputPassword
            password={password}
            setPassword={setPassword}
            innerRef={passwordRef}
          />
          <Spacer size="L" />
          {recoveryError?.message?.length > 0 && (
            <View style={styles.containerError}>
              <Text style={styles.error}>{recoveryError?.message}</Text>
            </View>
          )}
          <ButtonAuth
            isRestore
            isPhoneAuth={isPhoneAuth}
            value={value}
            password={password}
            email={email}
            label="Подтвердить"
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
