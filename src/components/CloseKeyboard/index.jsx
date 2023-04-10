import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './style';

export const BtnCloseKeyboard = ({ scrollHeight, onPress }) => {
  return (
    <View style={[styles.container, { bottom: scrollHeight }]}>
      <TouchableOpacity style={styles.btn} onPress={onPress}>
        <Text style={styles.readyTitle}>Закрыть</Text>
      </TouchableOpacity>
    </View>
  );
};
