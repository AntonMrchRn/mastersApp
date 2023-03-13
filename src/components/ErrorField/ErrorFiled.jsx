import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

export const ErrorField = ({ error }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{error}</Text>
    </View>
  );
};
