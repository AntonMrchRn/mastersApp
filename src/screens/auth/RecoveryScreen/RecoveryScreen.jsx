import { useNavigation } from '@react-navigation/native';
import React, { createRef, useEffect, useState } from 'react';
import { Keyboard, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Input, TypeSelection } from '~/components';
import ForgotPreview from '../../../components/auth/ForgotPreview/ForgotPreview';
import ModalComponentScreen from '../../../components/auth/ModalComponentAuth';
import { TimerBlock } from '../../../components/auth/Timer/Timer';
import { TimerBlockEmail } from '../../../components/auth/TimerEmail/TimerEmail';
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
  const [active, setActive] = useState(false);

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
    if (isRecovery && isPhoneAuth && !isRecoveryEmail) {
      navigation.navigate('RecoveryConfirmScreen', { tel: tel });
      dispatch(clearRecoveryError());
    }
    if (!isPhoneAuth) {
      Keyboard.dismiss();
      dispatch(modalVisibleEmail(true));
    }
  }, [isRecovery, isRecoveryEmail]);

  const OFFSET = 100;

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

  const passwordRef = createRef();
  const scrollViewRef = createRef();

  return (
    <SafeAreaView style={styles.container}>
      <Header label={'Восстановление пароля'} callBack={goBack} />
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
          <ForgotPreview />
          <TypeSelection
            setIsPhoneAuth={setIsPhoneAuth}
            isPhoneAuth={isPhoneAuth}
            setTel={setTel}
            seteMail={seteMail}
            setActive={setActive}
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
            onSubmitEditing={() => passwordRef?.current?.focus()}
            onFocus={configApp.ios ? focusInput : () => {}}
            setActive={setActive}
            active={active}
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
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
