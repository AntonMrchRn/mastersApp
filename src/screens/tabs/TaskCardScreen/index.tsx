import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from './style';

const TaskCardScreen = () => {
  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <View style={styles.wrapperCenter}>
        <Text>Карточка</Text>
      </View>
    </SafeAreaView>
  );
};

export default TaskCardScreen;
