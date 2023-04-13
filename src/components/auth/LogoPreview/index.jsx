import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './style';
import Logo from '../../svg/auth/Logo';

export const LogoPreview = ({ label = '' }) => {
  return (
    <View style={styles.container}>
      <Logo />
      <Text style={styles.title}>{label}</Text>
    </View>
  );
};

export default LogoPreview;
