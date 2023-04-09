import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Keyboard, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import { InputPassword, Button } from '~/components';
import CodeFieldInput from '../../../components/auth/CodeField/CodeField';
import ConfrimPreview from '../../../components/auth/ConfirmPreview/ConfirmPreview';
import ModalComponentScreen from '../../../components/auth/ModalComponentAuth';
import { TimerBlock } from '../../../components/auth/Timer/Timer';
import { BtnCloseKeyboard } from '../../../components/CloseKeyboard';
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
  const [scrollHeight, setScrollHeight] = useState(195);
  const [onKey, setOnKey] = useState(false);
  const [keyboardActive, setKeyboardActive] = useState(false);

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
    Keyboard.addListener('keyboardDidShow', () => {
      setOnKey(true);
    });
    Keyboard.addListener('keyboardWillHide', () => {
      setOnKey(false);
    });
    return () => {
      Keyboard.removeAllListeners('keyboardDidShow');
    };
  });

  useEffect(() => {
    dispatch(clearRecoveryError());
  }, []);

  useEffect(() => {
    dispatch(clearRecoveryError());
  }, [password, value]);

  return (
    <SafeAreaView style={styles.container}>
      <Header label={'Подтверждение кодом'} callBack={goBack} />
      <KeyboardAwareScrollView
        behavior={'position'}
        contentContainerStyle={styles.containerKeyBoard}
        extraScrollHeight={scrollHeight}
        scrollEnabled={false}
        keyboardVerticalOffset={0}
        pagingEnabled={true}
      >
        <View style={styles.wrapperSignIn}>
          <View style={styles.wrapperSignInContainer}>
            <ConfrimPreview />
            <Spacer />
            <CodeFieldInput
              value={value}
              setValue={setValue}
              setKeyboardActive={setKeyboardActive}
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
              setScrollHeight={setScrollHeight}
            />
            <Spacer size="L" />
            {recoveryError?.message?.length > 0 && (
              <View style={styles.containerError}>
                <Text style={styles.error}>{recoveryError?.message}</Text>
              </View>
            )}
            <Button
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
          {configApp.ios && onKey && keyboardActive && (
            <BtnCloseKeyboard
              scrollHeight={recoveryError?.message?.length > 0 ? 124 : 85}
              onPress={() => Keyboard.dismiss()}
            />
          )}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
