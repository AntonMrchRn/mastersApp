import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  SafeAreaView,
  View,
} from 'react-native';
import { ShadowedView } from 'react-native-fast-shadow';

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, useIsFocused } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { TabControl, Text, useTheme } from 'rn-ui-kit';
import { TabItem } from 'rn-ui-kit/lib/typescript/components/TabControl';

import CardTasks from '@/components/tabs/TaskSearch/Card';
import PreviewNotFound, {
  PreviewNotFoundType,
} from '@/components/tabs/TaskSearch/PreviewNotFound';
import { configApp } from '@/constants/platform';
import { AppScreenName, AppStackParamList } from '@/navigation/AppNavigation';
import { BottomTabName, BottomTabParamList } from '@/navigation/TabNavigation';
import { useAppDispatch, useAppSelector } from '@/store';
import { tasksAPI } from '@/store/api/tasks';
import { Task } from '@/store/api/tasks/types';
import { useGetUserQuery } from '@/store/api/user';
import { selectAuth } from '@/store/slices/auth/selectors';
import {
  getMyTasks,
  refreshMyTasks,
} from '@/store/slices/myTasks/asyncActions';
import { clearList } from '@/store/slices/myTasks/reducer';
import { ErrorCode } from '@/types/error';
import { TaskSearch } from '@/types/task';

import styles from './style';

type MyTasksScreenProps = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, BottomTabName.MyTasks>,
  StackScreenProps<AppStackParamList>
>;
let abort: () => void | undefined;
const MyTasksScreen = ({ navigation }: MyTasksScreenProps) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isFocused = useIsFocused();

  const {
    data = [],
    loadingList,
    errorList,
    list,
  } = useAppSelector(state => state.myTasks);
  const mobileCounts = list?.mobileCounts || [];
  const [selectedTabID, setSelectedTabID] = useState(
    mobileCounts?.[0]?.id || 1,
  );

  const { user: authUser } = useAppSelector(selectAuth);
  const { data: user } = useGetUserQuery(authUser?.userID, {
    skip: !authUser?.userID,
  });
  const regionID = user?.regionIDs || [];
  const keyExtractor = (item: TaskSearch) => `${item.ID}`;
  const onItemPress = (id: number) => {
    dispatch(
      tasksAPI.endpoints.getTask.initiate(id, {
        forceRefetch: true,
      }),
    );
    navigation.navigate(AppScreenName.TaskCard, {
      taskId: id,
    });
  };
  const userRole = user?.roleID;
  const renderItem = ({ item }: ListRenderItemInfo<Task>) => (
    <CardTasks {...item} onItemPress={onItemPress} userRole={userRole} />
  );

  const onRefresh = () => {
    abort && abort();
    const ex = dispatch(refreshMyTasks({ idList: selectedTabID, regionID }));
    abort = ex.abort;
  };

  const cachedOnEndReached = useCallback(() => {
    !loadingList && data.length && data.length > 4
      ? dispatch(
          getMyTasks({
            idList: selectedTabID,
            fromTask: data?.length,
            regionID,
          }),
        )
      : null;
  }, [data]);

  const onChangeTab = (item: TabItem) => {
    if (item.id !== selectedTabID) {
      abort && abort();
      dispatch(clearList());
      const ex = dispatch(
        refreshMyTasks({
          idList: item.id,
          fromTask: 0,
          regionID,
        }),
      );
      abort = ex.abort;
      setSelectedTabID(item.id);
    }
  };

  useEffect(() => {
    if (isFocused) {
      onRefresh();
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapperTop}>
        <Text variant="title1" style={styles.textHeader}>
          Мои задачи
        </Text>
      </View>
      <TabControl
        contentContainerStyle={styles.wrapperTab}
        data={mobileCounts || []}
        onChange={onChangeTab}
        currentTabId={selectedTabID}
      />
      <ShadowedView
        style={[
          styles.shadowWrapper,
          !!data?.length && { ...configApp.shadow },
        ]}
      >
        {errorList?.code === ErrorCode.NoAccess ? (
          <PreviewNotFound type={PreviewNotFoundType.NoTasks} />
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
            refreshing={!!loadingList}
            contentContainerStyle={[
              styles.listContainer,
              !data?.length && styles.emptyListContainer,
            ]}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={
              <PreviewNotFound type={PreviewNotFoundType.TasksNotFound} />
            }
            initialNumToRender={4}
            onEndReachedThreshold={0.5}
            onEndReached={cachedOnEndReached}
          />
        )}
      </ShadowedView>
    </SafeAreaView>
  );
};

export default MyTasksScreen;
