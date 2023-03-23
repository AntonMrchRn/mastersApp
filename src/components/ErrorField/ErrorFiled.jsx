import React from 'react';
import { View, Text } from 'react-native';
import ErrorIcon from '../svg/auth/ErrorIcon';
import { styles } from './styles';

export const ErrorField = ({ error }) => {
  return (
    <View style={styles.container}>
      <ErrorIcon />
      <Text style={styles.text}>{error}</Text>
    </View>
  );
};
