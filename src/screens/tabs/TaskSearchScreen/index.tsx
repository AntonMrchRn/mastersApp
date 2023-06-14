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
import { useTheme } from 'rn-ui-kit';

import { CardTasks } from '@/components/TabScreens/TaskSearch/Card';
import PreviewNotFound from '@/components/TabScreens/TaskSearch/PreviewNotFound';
import TypeSelectionTaskSearch from '@/components/TabScreens/TaskSearch/TypeSelectionTaskSearch';
import { useAppDispatch, useAppSelector } from '@/store';
import { useGetTableNamesQuery } from '@/store/api/tasks';
import { Task } from '@/store/api/tasks/types';
import { getSearchTasks } from '@/store/slices/taskSearch/asyncActions';
import { TaskCardScreenNavigationProp } from '@/types/navigation';
import { TaskSearch } from '@/types/task';

import styles from './style';

const TaskSearchScreen = () => {
  const navigation = useNavigation<TaskCardScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const [activeTab, setActiveTab] = useState(1);
  const { list, loadingList } = useAppSelector(state => state.taskSearch);

  const { data: tableNames } = useGetTableNamesQuery();

  useEffect(() => {
    dispatch(getSearchTasks({ idList: activeTab }));
  }, []);

  const keyExtractor = (item: TaskSearch) => `${item.ID}`;

  const renderItem = ({ item }: ListRenderItemInfo<Task>) => (
    <CardTasks {...item} navigation={navigation} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapperTop}>
        <Text style={styles.textHeader}>Поиск задач</Text>
        <TypeSelectionTaskSearch
          setActiveTab={setActiveTab}
          tableNames={tableNames}
        />
      </View>
      <View style={styles.shadowWrapper}>
        <FlatList
          data={list.tasks}
          renderItem={renderItem}
          onRefresh={() => dispatch(getSearchTasks({ idList: activeTab }))}
          refreshing={loadingList}
          style={styles.list}
          keyExtractor={keyExtractor}
          contentContainerStyle={[
            styles.listContainer,
            !list?.tasks?.length && loadingList && styles.wrapper,
          ]}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={
            loadingList ? (
              <ActivityIndicator
                size={'large'}
                color={theme.background.accent}
              />
            ) : (
              <PreviewNotFound />
            )
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default TaskSearchScreen;
