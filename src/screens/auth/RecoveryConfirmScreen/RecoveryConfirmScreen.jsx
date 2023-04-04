import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import { InputPassword, Button } from '~/components';
import CodeFieldInput from '../../../components/auth/CodeField/CodeField';
import ConfrimPreview from '../../../components/auth/ConfirmPreview/ConfirmPreview';
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
        navigation.navigate('SignUpScreen');
        dispatch(modalVisible(true));
      }
    });
  };

  useEffect(() => {
    dispatch(clearRecoveryError());
  }, []);

  useEffect(() => {
    dispatch(clearRecoveryError());
  }, [password, value]);

  return (
    <SafeAreaView style={styles.container}>
      <Header label={'Подтверждение кодом'} callBack={goBack} />
      <KeyboardAvoidingView
        behavior={configApp.ios ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.wrapperSignIn}>
          <ConfrimPreview />
          <Spacer />
          <CodeFieldInput value={value} setValue={setValue} />
          <InputPassword password={password} setPassword={setPassword} />
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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
