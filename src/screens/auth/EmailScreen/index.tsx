import React, { useEffect } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useIsFocused } from '@react-navigation/native';

import ConfirmPreviewEmail from '@/components/auth/ConfirmPreviewEmail';
import LogoPreview from '@/components/auth/LogoPreview';
import { useAppDispatch } from '@/store';
import {
  clearAuthError,
  clearRecoveryError,
} from '@/store/slices/auth/actions';

import styles from './style';

const EmailScreen = () => {
  const dispatch = useAppDispatch();

  const isFocused = useIsFocused();

  useEffect(() => {
    dispatch(clearRecoveryError());
    dispatch(clearAuthError(null));
  }, [isFocused]);

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <View style={styles.wrapperSignIn}>
        <LogoPreview label="Восстановление пароля" height={135} />
        <ConfirmPreviewEmail />
      </View>
    </SafeAreaView>
  );
};

export default EmailScreen;
