import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { styles } from './style';

type ButtonProps = {
  label: string;
  onPress: () => void;
};

export const Button = ({ label = 'Войти', onPress }: ButtonProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={onPress}>
        <Text style={styles.labelBtn}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};
