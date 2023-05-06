import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList, SafeAreaView, Text, View } from 'react-native';
import PreviewNotFound from '../../../components/TabScreens/TaskSearchScreen/PreviewNotFound/PreviewNotFound';
import TaskCardItem from '../../../components/TabScreens/TaskSearchScreen/TaskCardItem/TaskCardItem';
import { TypeSelectionTaskSearch } from '../../../components/TabScreens/TaskSearchScreen/TypeSelectionTaskSearch/TypeSelectionTaskSearch';

import styles from './style';

const TaskSearchScreen = () => {
  const [areСommon, setAreСommon] = useState(true);
  const navigation: any = useNavigation();

  const taskItem = () => {
    navigation.navigate('TaskCard');
  };

  const dataFlat = [
    { Тест: 'Тест' },
    { Тест: 'Тест' },
    { Тест: 'Тест' },
    { Тест: 'Тест' },
    { Тест: 'Тест' },
    { Тест: 'Тест' },
    { Тест: 'Тест' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapperTop}>
        <Text style={styles.textHeader}>Поиск задач</Text>
        <TypeSelectionTaskSearch
          areСommon={areСommon}
          setAreСommon={setAreСommon}
        />
      </View>
      <View
        style={[
          styles.wrapperCenter,
          dataFlat.length > 0 && styles.wrapperList,
        ]}
      >
        <FlatList
          data={dataFlat}
          renderItem={item => {
            return <TaskCardItem item={item} onPress={() => taskItem()} />;
          }}
          contentContainerStyle={dataFlat?.length < 1 && styles.wrapperCenter}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={<PreviewNotFound />}
        />
      </View>
    </SafeAreaView>
  );
};

export default TaskSearchScreen;
