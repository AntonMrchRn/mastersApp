import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './style';

const TaskCardItem = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.wrapper} onPress={onPress}>
      <View style={styles.wrapperItem}>
        <Text>Тест</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TaskCardItem;
