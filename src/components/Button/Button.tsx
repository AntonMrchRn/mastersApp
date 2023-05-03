import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { styles } from './style';

export const Button = ({ label = 'Войти', onPress }: any) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={onPress}>
        <Text style={styles.labelBtn}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};
