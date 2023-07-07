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
import { BottomSheet, Text, useTheme } from 'rn-ui-kit';

import CardTasks from '@/components/TabScreens/TaskSearch/Card';
import PreviewNotFound from '@/components/TabScreens/TaskSearch/PreviewNotFound';
import TypeSelectionTaskSearch from '@/components/TabScreens/TaskSearch/TypeSelectionTaskSearch';
import { configApp } from '@/constants/platform';
import { AppScreenName, AppStackParamList } from '@/navigation/AppNavigation';
import { BottomTabName, BottomTabParamList } from '@/navigation/TabNavigation';
import { useAppDispatch, useAppSelector } from '@/store';
import { Task } from '@/store/api/tasks/types';
import { useGetUserQuery } from '@/store/api/user';
import { selectAuth } from '@/store/slices/auth/selectors';
import {
  getSearchTasks,
  refreshTasks,
} from '@/store/slices/taskSearch/asyncActions';
import { TaskSearch } from '@/types/task';

import styles from './style';

export type TaskSearchScreenProps = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, BottomTabName.TaskSearch>,
  StackScreenProps<AppStackParamList>
>;
const TaskSearchScreen: FC<TaskSearchScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const [selectedTab, setSelectedTab] = useState(1);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const {
    data = [],
    loadingList,
    errorList,
  } = useAppSelector(state => state.taskSearch);
  const useModal = () => setIsVisibleModal(!isVisibleModal);
  const { user: authUser } = useAppSelector(selectAuth);

  const { data: user, isLoading } = useGetUserQuery(authUser?.userID, {
    skip: !authUser?.userID,
  });

  const onItemPress = (id: number) => {
    if (user?.hasITAccess) {
      navigation.navigate(AppScreenName.TaskCard, {
        taskId: id,
      });
    } else {
      setIsVisibleModal(!isVisibleModal);
    }
  };

  const keyExtractor = (item: TaskSearch) => `${item.ID}`;
  const renderItem = ({ item }: ListRenderItemInfo<Task>) => (
    <CardTasks {...item} onItemPress={onItemPress} />
  );

  const onRefresh = () =>
    dispatch(refreshTasks({ idList: selectedTab, regionID: user?.regionIDs }));

  const onEndReached = () => {
    !loadingList && data.length && user?.regionIDs
      ? dispatch(
          getSearchTasks({
            idList: selectedTab,
            fromTask: data?.length,
            regionID: user?.regionIDs,
          })
        )
      : null;
  };

  useEffect(() => {
    if (user?.regionIDs) onRefresh();
  }, [user?.regionIDs]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapperTop}>
        <Text variant="title1" style={styles.textHeader}>
          Поиск задач
        </Text>
        <TypeSelectionTaskSearch
          setActiveTab={setSelectedTab}
          onRefresh={onRefresh}
        />
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
      <BottomSheet
        isVisible={isVisibleModal}
        onBackdropPress={useModal}
        onSwipeComplete={useModal}
      >
        <View style={styles.wrapperPreview}>
          <PreviewNotFound type={2} closeModal={useModal} />
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default TaskSearchScreen;
