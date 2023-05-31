import React from 'react';
import { View } from 'react-native';

import { SegmentedControl } from 'rn-ui-kit';

import { useAppDispatch } from '@/store';
import {
  clearAuthError,
  clearRecoveryError,
} from '@/store/slices/auth/actions';

import styles from './style';

type TypeSelectionProps = {
  setTel: (tel: string) => void;
  setEmail: (email: string) => void;
  setIsActive: (isActive: boolean) => void;
  setIsPhoneAuth: (isPhoneAuth: boolean) => void;
};

const TypeSelection = ({
  setTel,
  setEmail,
  setIsActive,
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
      <SegmentedControl
        tabs={['Телефон', 'Email']}
        onChange={index => {
          if (index === 0) {
            selectPhone();
          }
          if (index === 1) {
            selectEmail();
          }
        }}
        textStyle={styles.txt}
      />
    </View>
  );
};

export default TypeSelection;
