import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Logo = () => (
  <View style={styles.container}>
    <Image source={require('../../../assets/icons/logo.png')} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 15,
    flex: 1.5,
  },
});

export default Logo;
