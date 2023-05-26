import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { Task } from '../../../../types/task';

import styles from './style';

type TaskCardItemProps = {
  task: Task;
  onPress: () => void;
};

const TaskCardItem = ({ task, onPress }: TaskCardItemProps) => {
  return (
    <TouchableOpacity style={styles.wrapper} onPress={onPress}>
      <View style={styles.wrapperItem}>
        <Text>Тест</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TaskCardItem;
