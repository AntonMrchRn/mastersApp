import React from 'react';
import { Text } from 'react-native';
import { styles } from './styles';

type ErrorProps = {
  error: string | null;
};

export const ErrorField = ({ error }: ErrorProps) => {
  return <Text style={styles.text}>{error}</Text>;
};
