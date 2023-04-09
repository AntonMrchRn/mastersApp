import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Keyboard, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Input, TypeSelection } from '~/components';
import ForgotPreview from '../../../components/auth/ForgotPreview/ForgotPreview';
import ModalComponentScreen from '../../../components/auth/ModalComponentAuth';
import { TimerBlock } from '../../../components/auth/Timer/Timer';
import { TimerBlockEmail } from '../../../components/auth/TimerEmail/TimerEmail';
import { BtnCloseKeyboard } from '../../../components/CloseKeyboard';
import Header from '../../../components/Header/Header';
import Spacer from '../../../components/Spacer/Spacer';
import { storageMMKV } from '../../../mmkv/storage';
import { recoveryPassword } from '../../../redux/slices/auth/asyncActions';
import {
  clearRecoveryError,
  modalVisibleEmail,
} from '../../../redux/slices/auth/reducer';
import { configApp } from '../../../utils/helpers/platform';

import { styles } from './style';

export const RecoveryScreen = () => {
  const {
    isRecovery,
    timeout,
    recoveryError,
    visibleEmail,
    timeOutEmail,
    isRecoveryEmail,
  } = useSelector(state => state.auth);
  const [isPhoneAuth, setIsPhoneAuth] = useState(true);
  const [tel, setTel] = useState('');
  const [email, seteMail] = useState('');
  const [password, setPassword] = useState('');
  const [scrollHeight, setScrollHeight] = useState(55);
  const [onKey, setOnKey] = useState(false);
  const [keyActive, setKeyActive] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const recoveryRequest = async () => {
    await dispatch(recoveryPassword({ tel, email, isPhoneAuth, navigation }));
  };

  useEffect(() => {
    dispatch(clearRecoveryError());
  }, []);

  const closeModal = () => {
    dispatch(modalVisibleEmail(false));
    dispatch(clearRecoveryError());
    navigation.goBack();
  };

  const goBack = () => {
    dispatch(clearRecoveryError());
    navigation.goBack();
  };

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
    if (isRecovery && isPhoneAuth && !isRecoveryEmail) {
      navigation.navigate('RecoveryConfirmScreen', { tel: tel });
      dispatch(clearRecoveryError());
    }
    if (!isPhoneAuth) {
      Keyboard.dismiss();
      dispatch(modalVisibleEmail(true));
    }
  }, [isRecovery, isRecoveryEmail]);

  return (
    <SafeAreaView style={styles.container}>
      <Header label={'Восстановление пароля'} callBack={goBack} />
      <KeyboardAwareScrollView
        behavior={'position'}
        contentContainerStyle={styles.containerKeyBoard}
        extraScrollHeight={isPhoneAuth ? 220 : 160}
        scrollEnabled={false}
        keyboardVerticalOffset={0}
        pagingEnabled={true}
      >
        <View style={styles.wrapperSignIn}>
          <View style={styles.wrapperSignInContainer}>
            <ForgotPreview />
            <TypeSelection
              setIsPhoneAuth={setIsPhoneAuth}
              isPhoneAuth={isPhoneAuth}
              setTel={setTel}
              seteMail={seteMail}
            />
            <ModalComponentScreen
              visible={visibleEmail}
              navigation={navigation}
              label="На ваш Email отправлено письмо для
              подтверждения смены пароля. Следуйте инструкциям в письме."
              textBtn="Перейти на главную"
              onPress={closeModal}
            />
            <Spacer />
            <Input
              isPhoneAuth={isPhoneAuth}
              tel={tel}
              email={email}
              setMail={seteMail}
              setTel={setTel}
              setScrollHeight={setScrollHeight}
              setKeyActive={setKeyActive}
            />
            {recoveryError?.message?.length > 0 && (
              <View style={styles.containerError}>
                <Text style={styles.error}>{recoveryError?.message}</Text>
              </View>
            )}
            <Spacer size="L" />
            <Button
              isPhoneAuth={isPhoneAuth}
              tel={tel}
              password={password}
              email={email}
              label="Продолжить"
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
          {configApp.ios && onKey && keyActive && (
            <BtnCloseKeyboard
              scrollHeight={recoveryError?.message?.length > 0 ? 122 : 82}
              onPress={() => Keyboard.dismiss()}
            />
          )}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
