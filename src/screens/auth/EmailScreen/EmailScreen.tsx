import { useIsFocused } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ConfrimPreviewEmail from '../../../components/auth/ConfirmPreviewEmail/ConfirmPreviewEmail';
import LogoPreview from '../../../components/auth/LogoPreview';

import {
  clearAuthError,
  clearRecoveryError,
} from '../../../redux/slices/auth/reducer';
import { useAppDispatch } from '../../../utils/hooks/useRedux';

import { styles } from './style';

export const EmailScreen = () => {
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
        <ConfrimPreviewEmail />
      </View>
    </SafeAreaView>
  );
};
