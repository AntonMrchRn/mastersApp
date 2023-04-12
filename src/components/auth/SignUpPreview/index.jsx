import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './style';
import Logo from '../../svg/auth/Logo';

export const SignUpPreview = () => {
  return (
    <View style={styles.container}>
      <Logo />
      <Text style={styles.title}>Войдите в систему</Text>
    </View>
  );
};

export default SignUpPreview;
