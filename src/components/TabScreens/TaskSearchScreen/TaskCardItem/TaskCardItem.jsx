import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './style';

const TaskCardItem = ({ item, onPress }) => {
  return (
    <View style={styles.wrapperNotFound}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.wrapperItem}>
          <Text>Тест</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default TaskCardItem;
