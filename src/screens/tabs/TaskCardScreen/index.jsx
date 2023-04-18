import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import Header from '../../../components/Header/Header';

import styles from './style';

const TaskCardScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <Header
        callBack={() => {
          navigation.goBack();
        }}
        itemFlag
      />
      <View style={styles.wrapperCenter}>
        <Text>Карточка</Text>
      </View>
    </SafeAreaView>
  );
};

export default TaskCardScreen;
