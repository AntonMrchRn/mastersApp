import React, { useEffect } from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  SafeAreaView,
  Text,
  View,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { CardTasks } from '@/components/TabScreens/TaskSearch/Card';
import PreviewNotFound from '@/components/TabScreens/TaskSearch/PreviewNotFound';
import TypeSelectionTaskSearch from '@/components/TabScreens/TaskSearch/TypeSelectionTaskSearch';
import { useAppDispatch } from '@/store';
import {
  getSearchTasks,
  getTableNames,
} from '@/store/slices/taskSearch/asyncActions';
import { TaskCardScreenNavigationProp } from '@/types/navigation';
import { Task } from '@/types/task';

import styles from './style';

const tasksMockData: Task[] = [
  { id: 12213, test: 'Тест1' },
  { id: 1, test: 'Тест2' },
  { id: 2, test: 'Тест3' },
  { id: 3, test: 'Тест1' },
  { id: 4, test: 'Тест2' },
  { id: 5, test: 'Тест3' },
];

const TaskSearchScreen = () => {
  const navigation = useNavigation<TaskCardScreenNavigationProp>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    // dispatch(getTableNames());
    dispatch(getSearchTasks());
  }, []);

  const keyExtractor = (item: Task) => `${item.id}`;

  const renderItem = ({ item }: ListRenderItemInfo<Task>) => (
    <CardTasks {...item} navigation={navigation} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapperTop}>
        <Text style={styles.textHeader}>Поиск задач</Text>
        <TypeSelectionTaskSearch onPress={() => console.log('test123')} />
      </View>
      <View style={styles.shadowWrapper}>
        <FlatList
          data={tasksMockData}
          renderItem={renderItem}
          style={styles.list}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={<PreviewNotFound />}
        />
      </View>
    </SafeAreaView>
  );
};

export default TaskSearchScreen;
