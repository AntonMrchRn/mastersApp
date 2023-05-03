import React from 'react';
import { Text } from 'react-native';
import { styles } from './styles';

export const ErrorField = ({ error }) => {
  return <Text style={styles.text}>{error}</Text>;
};
