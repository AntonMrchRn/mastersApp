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
import { useAppDispatch, useAppSelector } from '@/store';
import { useGetTableNamesQuery } from '@/store/api/tasks';
import { Task } from '@/store/api/tasks/types';
import {
  getSearchTasks,
  refreshTasks,
} from '@/store/slices/taskSearch/asyncActions';
import { TaskCardScreenNavigationProp } from '@/types/navigation';
import { TaskSearch } from '@/types/task';

import styles from './style';

const MyTasksScreen = () => {
  const navigation = useNavigation<TaskCardScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const [selectedTab, setSelectedTab] = useState(1);
  const {
    data = [],
    loadingList,
    errorList,
  } = useAppSelector(state => state.taskSearch);

  const { data: tableNames } = useGetTableNamesQuery();

  const keyExtractor = (item: TaskSearch) => `${item.ID}`;
  const renderItem = ({ item }: ListRenderItemInfo<Task>) => (
    <CardTasks {...item} navigation={navigation} />
  );

  const onRefresh = () => dispatch(refreshTasks({ idList: selectedTab }));
  const onEndReached = () => {
    !loadingList &&
      dispatch(
        getSearchTasks({
          idList: selectedTab,
          fromTask: data?.length,
        })
      );
  };

  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapperTop}>
        <Text style={styles.textHeader}>Мои задачи</Text>
      </View>
      <View style={styles.shadowWrapper}>
        {errorList?.code === 20007 ? (
          <PreviewNotFound type={3} />
        ) : loadingList && !data.length ? (
          <ActivityIndicator size={'large'} color={theme.background.accent} />
        ) : (
          <FlatList
            scrollsToTop
            data={data}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            style={styles.list}
            onRefresh={onRefresh}
            refreshing={loadingList}
            contentContainerStyle={[
              styles.listContainer,
              !data?.length && styles.container,
            ]}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={<PreviewNotFound type={1} />}
            initialNumToRender={4}
            onEndReachedThreshold={7}
            onEndReached={onEndReached}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default MyTasksScreen;
