import React, { useState } from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  SafeAreaView,
  Text,
  View,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import PreviewNotFound from '../../../components/TabScreens/TaskSearchScreen/PreviewNotFound/PreviewNotFound';
import TaskCardItem from '../../../components/TabScreens/TaskSearchScreen/TaskCardItem/TaskCardItem';
import { TypeSelectionTaskSearch } from '../../../components/TabScreens/TaskSearchScreen/TypeSelectionTaskSearch/TypeSelectionTaskSearch';

import { TaskCardScreenNavigationProp } from '../../../types/navigation';
import { Task } from '../../../types/task';

import styles from './style';

const tasksMockData: Task[] = [
  { id: 12213, test: 'Тест' },
  { id: 4522, test: 'Тест' },
  { id: 3243, test: 'Тест' },
  { id: 5342, test: 'Тест' },
  { id: 54323, test: 'Тест' },
  { id: 34543, test: 'Тест' },
  { id: 2313, test: 'Тест' },
];

const TaskSearchScreen = () => {
  const [areCommon, setAreCommon] = useState<boolean>(true);
  const navigation = useNavigation<TaskCardScreenNavigationProp>();

  const keyExtractor = (item: Task) => `${item.id}`;
  const renderItem = ({ item: task }: ListRenderItemInfo<Task>) => (
    <TaskCardItem task={task} onPress={taskItem} />
  );
  const taskItem = () => {
    navigation.navigate('TaskCard');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapperTop}>
        <Text style={styles.textHeader}>Поиск задач</Text>
        <TypeSelectionTaskSearch
          areCommon={areCommon}
          setAreCommon={setAreCommon}
        />
      </View>
      <View
        style={[
          styles.wrapperCenter,
          tasksMockData.length > 0 && styles.wrapperList,
        ]}
      >
        <FlatList
          data={tasksMockData}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={
            tasksMockData?.length < 1 && styles.wrapperCenter
          }
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={<PreviewNotFound />}
        />
      </View>
    </SafeAreaView>
  );
};

export default TaskSearchScreen;
