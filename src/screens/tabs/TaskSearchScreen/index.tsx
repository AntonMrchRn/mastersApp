import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
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
import { useAppDispatch, useAppSelector } from '@/store';
import {
  getSearchTasks,
  getTableNames,
} from '@/store/slices/taskSearch/asyncActions';
import { TaskCardScreenNavigationProp } from '@/types/navigation';
import { Task } from '@/types/task';

import styles from './style';

const TaskSearchScreen = () => {
  const [activeTab, setActiveTab] = useState(1);
  const navigation = useNavigation<TaskCardScreenNavigationProp>();
  const dispatch = useAppDispatch();

  const { list, loadingList } = useAppSelector(state => state.taskSearch);

  useEffect(() => {
    dispatch(getTableNames());
    dispatch(getSearchTasks({ idList: activeTab }));
  }, []);

  const keyExtractor = (item: Task) => `${item.ID}`;

  const renderItem = ({ item }: ListRenderItemInfo<Task>) => (
    <CardTasks {...item} navigation={navigation} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapperTop}>
        <Text style={styles.textHeader}>Поиск задач</Text>
        <TypeSelectionTaskSearch setActiveTab={setActiveTab} />
      </View>
      <View style={styles.shadowWrapper}>
        <FlatList
          data={list?.tasks}
          renderItem={renderItem}
          onRefresh={() => dispatch(getSearchTasks({ idList: activeTab }))}
          refreshing={loadingList}
          style={styles.list}
          keyExtractor={keyExtractor}
          contentContainerStyle={[
            styles.listContainer,
            !list?.tasks?.length && styles.wrapper,
          ]}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={<PreviewNotFound />}
        />
      </View>
    </SafeAreaView>
  );
};

export default TaskSearchScreen;
