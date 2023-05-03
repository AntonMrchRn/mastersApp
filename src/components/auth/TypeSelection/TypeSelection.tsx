import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import {
  clearAuthError,
  clearRecoveryError,
} from '../../../redux/slices/auth/reducer';

import { styles } from './style';

type TypeSelectionProps = {
  isPhoneAuth: boolean;
  setIsPhoneAuth: any;
  seteMail: any;
  setTel: any;
  setActive: any;
};

export const TypeSelection = ({
  isPhoneAuth,
  setIsPhoneAuth,
  seteMail,
  setTel,
  setActive,
}: TypeSelectionProps) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.btn, isPhoneAuth && styles.activeBtn]}
        onPress={() => {
          // @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
          dispatch(clearAuthError());
          dispatch(clearRecoveryError());
          seteMail('');
          setIsPhoneAuth(true);
          setActive(false);
        }}
      >
        <Text style={[styles.textBtn, isPhoneAuth && styles.activeTextBtn]}>
          Телефон
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.btn, !isPhoneAuth && styles.activeBtn]}
        onPress={() => {
          // @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
          dispatch(clearAuthError());
          dispatch(clearRecoveryError());
          setTel('');
          setIsPhoneAuth(false);
          setActive(false);
        }}
      >
        <Text style={[styles.textBtn, !isPhoneAuth && styles.activeTextBtn]}>
          Email
        </Text>
      </TouchableOpacity>
    </View>
  );
};
