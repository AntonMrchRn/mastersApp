import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import Header from '../../../components/Header/Header';

import styles from './style';

const TaskCardScreen = () => {
  const navigation: any = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <Header
        callBack={() => {
          navigation.goBack();
        }}
        itemFlag
        label={''}
      />
      <View style={styles.wrapperCenter}>
        <Text>Карточка</Text>
      </View>
    </SafeAreaView>
  );
};

export default TaskCardScreen;
