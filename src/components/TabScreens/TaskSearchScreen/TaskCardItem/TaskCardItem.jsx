import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './style';

const TaskCardItem = ({ item }) => {
  return (
    <View style={styles.wrapperNotFound}>
      <TouchableOpacity>
        <View style={styles.wrapperItem}>
          <Text>Тест</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default TaskCardItem;
