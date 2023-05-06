import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import {
  clearAuthError,
  clearRecoveryError,
} from '../../../redux/slices/auth/reducer';
import { useAppDispatch } from '../../../utils/hooks/useRedux';

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
  const dispatch = useAppDispatch();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.btn, isPhoneAuth && styles.activeBtn]}
        onPress={() => {
          dispatch(clearAuthError(null));
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
          dispatch(clearAuthError(null));
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
