import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './style';
import Logo from '../../svg/auth/Logo';
import normalize from 'react-native-normalize';

type LogoProps = {
  label: string;
  height: number;
};

export const LogoPreview = ({ label = '', height }: LogoProps) => {
  return (
    <View style={[styles.container, { height: normalize(height, 'height') }]}>
      <Logo />
      <Text style={styles.title}>{label}</Text>
    </View>
  );
};

export default LogoPreview;
