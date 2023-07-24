import React, { FC, useCallback, useEffect, useState } from 'react';
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
import { TabControl, Text, useTheme } from 'rn-ui-kit';
import { TabItem } from 'rn-ui-kit/lib/typescript/components/TabControl';

import CardTasks from '@/components/tabs/TaskSearch/Card';
import PreviewNotFound from '@/components/tabs/TaskSearch/PreviewNotFound';
import { configApp } from '@/constants/platform';
import { AppScreenName, AppStackParamList } from '@/navigation/AppNavigation';
import { BottomTabName, BottomTabParamList } from '@/navigation/TabNavigation';
import { useAppDispatch, useAppSelector } from '@/store';
import { Task } from '@/store/api/tasks/types';
import { useGetUserQuery } from '@/store/api/user';
import { selectAuth } from '@/store/slices/auth/selectors';
import {
  getMyTasks,
  refreshMyTasks,
} from '@/store/slices/myTasks/asyncActions';
import { clearList } from '@/store/slices/myTasks/reducer';
import { TaskSearch } from '@/types/task';

import styles from './style';

export type MyTasksScreenProps = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, BottomTabName.MyTasks>,
  StackScreenProps<AppStackParamList>
>;

const MyTasksScreen: FC<MyTasksScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const [selectedTab, setSelectedTab] = useState(1);
  const {
    data = [],
    loadingList,
    errorList,
    list: { mobileCounts = [] },
  } = useAppSelector(state => state.myTasks);

  const { user: authUser } = useAppSelector(selectAuth);
  const { data: user } = useGetUserQuery(authUser?.userID, {
    skip: !authUser?.userID,
  });
  const regionID = user?.regionIDs || [];
  const keyExtractor = (item: TaskSearch) => `${item.ID}`;
  const onItemPress = (id: number) => {
    navigation.navigate(AppScreenName.TaskCard, {
      taskId: id,
    });
  };
  const renderItem = ({ item }: ListRenderItemInfo<Task>) => (
    <CardTasks {...item} onItemPress={onItemPress} />
  );

  const onRefresh = () =>
    dispatch(refreshMyTasks({ idList: selectedTab, regionID }));

  const cachedOnEndReached = useCallback(() => {
    !loadingList && data.length && data.length > 4
      ? dispatch(
          getMyTasks({
            idList: selectedTab,
            fromTask: data?.length,
            regionID,
          })
        )
      : null;
  }, [data]);

  const onChangeTab = (item: TabItem) => {
    if (item.id !== selectedTab) {
      dispatch(clearList());
      dispatch(
        refreshMyTasks({
          idList: item.id,
          fromTask: 0,
          regionID,
        })
      );
      setSelectedTab(item.id);
    }
  };

  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapperTop}>
        <Text variant="title1" style={styles.textHeader}>
          Мои задачи
        </Text>
      </View>
      <TabControl
        contentContainerStyle={styles.wrapperTab}
        initialId={1}
        data={mobileCounts}
        onChange={onChangeTab}
      />
      <View
        style={[
          styles.shadowWrapper,
          !!data?.length && { ...configApp.shadow },
        ]}
      >
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
            onEndReachedThreshold={0.5}
            onEndReached={cachedOnEndReached}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default MyTasksScreen;
