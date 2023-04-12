import React from 'react';
import { Keyboard, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import {
  clearAuthError,
  clearRecoveryError,
} from '../../../redux/slices/auth/reducer';

import { styles } from './style';

export const TypeSelection = ({
  isPhoneAuth,
  setIsPhoneAuth,
  seteMail,
  setTel,
  setActive,
}) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.btn, isPhoneAuth && styles.activeBtn]}
        onPress={() => {
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
