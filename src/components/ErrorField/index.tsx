import React from 'react';
import { Text } from 'react-native';

import styles from './style';

type ErrorFieldProps = {
  error: string;
};

const ErrorField = ({ error }: ErrorFieldProps) => {
  return <Text style={styles.text}>{error}</Text>;
};

export default ErrorField;
