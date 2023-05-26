import React from 'react';
import { Text } from 'react-native';

import { styles } from './styles';

type ErrorFieldProps = {
  error: string | null;
};

export const ErrorField = ({ error }: ErrorFieldProps) => {
  return <Text style={styles.text}>{error}</Text>;
};
