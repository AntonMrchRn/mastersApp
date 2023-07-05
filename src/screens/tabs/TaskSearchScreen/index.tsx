import React, { FC, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  SafeAreaView,
  View,
} from 'react-native';

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { Text, useTheme } from 'rn-ui-kit';

import CardTasks from '@/components/TabScreens/TaskSearch/Card';
import PreviewNotFound from '@/components/TabScreens/TaskSearch/PreviewNotFound';
import TypeSelectionTaskSearch from '@/components/TabScreens/TaskSearch/TypeSelectionTaskSearch';
import { configApp } from '@/constants/platform';
import { AppScreenName, AppStackParamList } from '@/navigation/AppNavigation';
import { useAppDispatch, useAppSelector } from '@/store';
import { Task } from '@/store/api/tasks/types';
import { useGetUserQuery } from '@/store/api/user';
import { selectAuth } from '@/store/slices/auth/selectors';
import {
  getSearchTasks,
  refreshTasks,
} from '@/store/slices/taskSearch/asyncActions';
import { BottomTabName, TabNavigationParamList } from '@/types/navigation';
import { TaskSearch } from '@/types/task';

import styles from './style';

export type TaskSearchScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabNavigationParamList, BottomTabName.TaskSearch>,
  StackScreenProps<AppStackParamList>
>;
const TaskSearchScreen: FC<TaskSearchScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const [selectedTab, setSelectedTab] = useState(1);
  const {
    data = [],
    loadingList,
    errorList,
  } = useAppSelector(state => state.taskSearch);
  const { user: authUser } = useAppSelector(selectAuth);

  // const { data: user } = useGetUserQuery(authUser?.userID, {
  //   skip: authUser?.userID,
  // });
  // console.log('user', user);
  const onItemPress = (id: number) => {
    navigation.navigate(AppScreenName.TaskCard, {
      taskId: id,
    });
  };

  const keyExtractor = (item: TaskSearch) => `${item.ID}`;
  const renderItem = ({ item }: ListRenderItemInfo<Task>) => (
    <CardTasks {...item} onItemPress={onItemPress} />
  );

  const onRefresh = () => dispatch(refreshTasks({ idList: selectedTab }));

  const onEndReached = () => {
    !loadingList && data.length
      ? dispatch(
          getSearchTasks({
            idList: selectedTab,
            fromTask: data?.length,
          })
        )
      : null;
  };

  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapperTop}>
        <Text variant="title1" style={styles.textHeader}>
          Поиск задач
        </Text>
        <TypeSelectionTaskSearch setActiveTab={setSelectedTab} />
      </View>
      <View
        style={[
          styles.shadowWrapper,
          !!data?.length && { ...configApp.shadow },
        ]}
      >
        {errorList?.code === 20007 ? (
          <PreviewNotFound type={2} />
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

export default TaskSearchScreen;
