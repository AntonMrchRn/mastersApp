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

import CardTasks from '@/components/TabScreens/TaskSearch/Card';
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

  const [selectedTab, setSelectedTab] = useState(1);
  const { list, loadingList } = useAppSelector(state => state.taskSearch);

  const { data: tableNames } = useGetTableNamesQuery();

  useEffect(() => {
    dispatch(getSearchTasks({ idList: selectedTab }));
  }, []);

  const keyExtractor = (item: TaskSearch) => `${item.ID}`;

  const renderItem = ({ item }: ListRenderItemInfo<Task>) => (
    <CardTasks {...item} navigation={navigation} />
  );

  const onRefresh = () => dispatch(getSearchTasks({ idList: selectedTab }));
  const onEndReached = () =>
    dispatch(
      getSearchTasks({
        idList: selectedTab,
        numberOfPosts: list.tasks ? list?.tasks?.length + 30 : 30,
      })
    );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapperTop}>
        <Text style={styles.textHeader}>Поиск задач</Text>
        <TypeSelectionTaskSearch
          setActiveTab={setSelectedTab}
          tableNames={tableNames}
        />
      </View>
      <View style={styles.shadowWrapper}>
        {loadingList && !list.tasks?.length ? (
          <ActivityIndicator size={'large'} color={theme.background.accent} />
        ) : (
          <FlatList
            scrollsToTop
            data={list?.tasks}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            style={styles.list}
            onRefresh={onRefresh}
            refreshing={loadingList}
            contentContainerStyle={[styles.listContainer]}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={<PreviewNotFound />}
            initialNumToRender={4}
            onEndReachedThreshold={7}
            onEndReached={onEndReached}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default TaskSearchScreen;
