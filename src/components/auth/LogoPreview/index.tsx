import React from 'react';
import { Text, View } from 'react-native';
import normalize from 'react-native-normalize';

import Logo from '@/assets/icons/svg/auth/Logo';

import styles from './style';

type LogoPreviewProps = {
  label: string;
  height: number;
};

const LogoPreview = ({ label = '', height }: LogoPreviewProps) => {
  return (
    <View style={[styles.container, { height: normalize(height, 'height') }]}>
      <Logo />
      <Text style={styles.title}>{label}</Text>
    </View>
  );
};

export default LogoPreview;
