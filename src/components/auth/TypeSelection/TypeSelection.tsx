import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { useAppDispatch } from '../../../store';
import {
  clearAuthError,
  clearRecoveryError,
} from '../../../store/slices/auth/actions';

import { styles } from './style';

type TypeSelectionProps = {
  isPhoneAuth: boolean;
  setTel: (tel: string) => void;
  setEmail: (email: string) => void;
  setIsActive: (isActive: boolean) => void;
  setIsPhoneAuth: (isPhoneAuth: boolean) => void;
};

export const TypeSelection = ({
  setTel,
  setEmail,
  setIsActive,
  isPhoneAuth,
  setIsPhoneAuth,
}: TypeSelectionProps) => {
  const dispatch = useAppDispatch();

  const selectPhone = () => {
    dispatch(clearAuthError(null));
    dispatch(clearRecoveryError());
    setEmail('');
    setIsPhoneAuth(true);
    setIsActive(false);
  };

  const selectEmail = () => {
    dispatch(clearAuthError(null));
    dispatch(clearRecoveryError());
    setTel('');
    setIsPhoneAuth(false);
    setIsActive(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.btn, isPhoneAuth && styles.activeBtn]}
        onPress={selectPhone}
      >
        <Text style={[styles.textBtn, isPhoneAuth && styles.activeTextBtn]}>
          Телефон
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.btn, !isPhoneAuth && styles.activeBtn]}
        onPress={selectEmail}
      >
        <Text style={[styles.textBtn, !isPhoneAuth && styles.activeTextBtn]}>
          Email
        </Text>
      </TouchableOpacity>
    </View>
  );
};
