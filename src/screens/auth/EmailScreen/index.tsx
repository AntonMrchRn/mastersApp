import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ConfirmPreviewEmail from '@/components/auth/ConfirmPreviewEmail';
import LogoPreview from '@/components/auth/LogoPreview';
import Header from '@/components/Header';

import styles from './style';

const EmailScreen = () => (
  <View style={styles.container}>
    <Header />
    <View style={styles.wrapperSignIn}>
      <LogoPreview label="Восстановление пароля" height={135} />
      <ConfirmPreviewEmail />
    </View>
  </View>
);

export default EmailScreen;
