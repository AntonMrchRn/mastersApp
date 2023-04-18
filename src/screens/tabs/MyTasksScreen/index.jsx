import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';

import styles from './style';

const MyTasksScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapperCenter}>
        <Text>Мои задачи</Text>
      </View>
    </SafeAreaView>
  );
};

export default MyTasksScreen;
