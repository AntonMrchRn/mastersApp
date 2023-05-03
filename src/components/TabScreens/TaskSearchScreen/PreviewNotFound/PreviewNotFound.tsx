import React from 'react';
import { Text, View } from 'react-native';
import TaskSearchClear from '../../../svg/screens/TaskSearchClear';
import styles from './style';

const PreviewNotFound = () => {
  return (
    <View style={styles.wrapperNotFound}>
      <TaskSearchClear />
      <Text style={styles.title}>Задачи не найдены</Text>
      <Text style={styles.text}>
        В вашем регионе задач сейчас нет. Попробуйте продолжить поиск позже
      </Text>
    </View>
  );
};

export default PreviewNotFound;
