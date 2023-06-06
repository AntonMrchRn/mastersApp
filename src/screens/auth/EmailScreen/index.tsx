import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ConfirmPreviewEmail from '@/components/auth/ConfirmPreviewEmail';
import LogoPreview from '@/components/auth/LogoPreview';

import styles from './style';

const EmailScreen = () => (
  <SafeAreaView edges={['bottom']} style={styles.container}>
    <View style={styles.wrapperSignIn}>
      <LogoPreview label="Восстановление пароля" height={135} />
      <ConfirmPreviewEmail />
    </View>
  </SafeAreaView>
);

export default EmailScreen;
