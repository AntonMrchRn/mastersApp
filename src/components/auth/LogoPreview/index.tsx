import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './style';
import Logo from '../../svg/auth/Logo';
import normalize from 'react-native-normalize';

export const LogoPreview = ({ label = '', height }) => {
  return (
    <View style={[styles.container, { height: normalize(height, 'height') }]}>
      <Logo />
      <Text style={styles.title}>{label}</Text>
    </View>
  );
};

export default LogoPreview;
