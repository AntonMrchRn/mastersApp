import React, { useEffect, useState } from 'react';
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
import { SegmentedControl, Text, useTheme } from 'rn-ui-kit';

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
  getSearchTasks,
  refreshTasks,
} from '@/store/slices/taskSearch/asyncActions';
import { clearList } from '@/store/slices/taskSearch/reducer';
import { ErrorCode } from '@/types/error';
import { RoleType, TaskSearch, TaskSetType } from '@/types/task';

import styles from './style';

const setTypeByTabIndex: Record<0 | 1, TaskSetType> = {
  0: TaskSetType.COMMON,
  1: TaskSetType.IT_SERVICES,
};

type TaskSearchScreenProps = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, BottomTabName.TaskSearch>,
  StackScreenProps<AppStackParamList>
>;
let abort: () => void | undefined;
const TaskSearchScreen = ({ navigation, route }: TaskSearchScreenProps) => {
  const theme = useTheme();
  const isFocused = useIsFocused();
  const dispatch = useAppDispatch();

  const tab = route.params?.tab;

  const [selectedTabId, setSelectedTabId] = useState<TaskSetType>(
    TaskSetType.COMMON,
  );

  const {
    data = [],
    loadingList,
    errorList,
  } = useAppSelector(state => state.taskSearch);

  const { user: authUser } = useAppSelector(selectAuth);
  const { data: user, refetch } = useGetUserQuery(authUser?.userID, {
    skip: !authUser?.userID,
  });
  const regionIDs = user?.regionIDs;
  const userRole = user?.roleID;

  useEffect(() => {
    if (regionIDs?.length && isFocused) {
      onRefresh();
      refetch();
    }
  }, [regionIDs?.length, isFocused]);

  useEffect(() => {
    onRefresh();
  }, [selectedTabId]);

  useEffect(() => {
    if (tab) {
      const setID = tab.split('|')[0];
      if (setID && selectedTabId !== +setID) {
        setSelectedTabId(+setID);
      }
    }
  }, [tab]);

  useEffect(() => {
    if (
      userRole === RoleType.INTERNAL_EXECUTOR &&
      selectedTabId !== TaskSetType.IT_SERVICES
    ) {
      setSelectedTabId(TaskSetType.IT_SERVICES);
    }
  }, [userRole]);

  const switchTab = (tabIndex: number) => {
    if (
      (tabIndex === 0 || tabIndex === 1) &&
      selectedTabId !== setTypeByTabIndex[tabIndex]
    ) {
      dispatch(clearList());
      setSelectedTabId(setTypeByTabIndex[tabIndex]);
    }
  };
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

  const keyExtractor = (item: TaskSearch) => `${item.ID}`;

  const renderItem = ({ item }: ListRenderItemInfo<Task>) => (
    <CardTasks {...item} onItemPress={onItemPress} userRole={userRole} />
  );

  const onRefresh = () => {
    if (regionIDs && regionIDs?.length) {
      abort && abort();
      const ex = dispatch(
        refreshTasks({ idList: selectedTabId, regionID: regionIDs }),
      );
      abort = ex.abort;
    }
  };

  const onEndReached = () => {
    if (!loadingList && data.length && regionIDs && regionIDs?.length) {
      dispatch(
        getSearchTasks({
          idList: selectedTabId,
          fromTask: data?.length,
          regionID: regionIDs,
        }),
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapperTop}>
        <Text variant="title1" style={styles.textHeader}>
          Поиск задач
        </Text>
        {userRole !== RoleType.INTERNAL_EXECUTOR && (
          <SegmentedControl
            currentTabId={selectedTabId === TaskSetType.COMMON ? 0 : 1}
            style={styles.tabs}
            onChange={switchTab}
            tabs={['Общие услуги', 'IT услуги']}
          />
        )}
      </View>
      <ShadowedView
        style={[
          styles.shadowWrapper,
          !!data?.length && { ...configApp.shadow },
        ]}
      >
        {errorList?.code === ErrorCode.NoAccess ? (
          <PreviewNotFound type={PreviewNotFoundType.TasksNotAvailable} />
        ) : !regionIDs?.length ? (
          <View style={[styles.mh20, styles.container]}>
            <PreviewNotFound type={PreviewNotFoundType.RegionNotChanged} />
          </View>
        ) : loadingList && !data.length ? (
          <ActivityIndicator size="large" color={theme.background.accent} />
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
            onEndReachedThreshold={7}
            onEndReached={onEndReached}
          />
        )}
      </ShadowedView>
    </SafeAreaView>
  );
};

export default TaskSearchScreen;
