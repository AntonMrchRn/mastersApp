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
import { TabControl, useTheme } from 'rn-ui-kit';
import { TabItem } from 'rn-ui-kit/lib/typescript/components/TabControl';

import CardTasks from '@/components/TabScreens/TaskSearch/Card';
import PreviewNotFound from '@/components/TabScreens/TaskSearch/PreviewNotFound';
import { configApp } from '@/constants/platform';
import { useAppDispatch, useAppSelector } from '@/store';
import { Task } from '@/store/api/tasks/types';
import {
  getMyTasks,
  refreshMyTasks,
} from '@/store/slices/myTasks/asyncActions';
import { getSearchTasks } from '@/store/slices/taskSearch/asyncActions';
import { TaskCardScreenNavigationProp } from '@/types/navigation';
import { TaskSearch } from '@/types/task';

import { taskSections } from './mock.data';

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
  } = useAppSelector(state => state.myTasks);

  const keyExtractor = (item: TaskSearch) => `${item.ID}`;

  const renderItem = ({ item }: ListRenderItemInfo<Task>) => (
    <CardTasks {...item} navigation={navigation} />
  );

  const onRefresh = () => dispatch(refreshMyTasks({ idList: selectedTab }));
  const onEndReached = () => {
    !loadingList &&
      dispatch(
        getMyTasks({
          idList: selectedTab,
          fromTask: data?.length,
        })
      );
  };
  const onChangeTab = (item: TabItem) => {
    if (item.id !== selectedTab) {
      dispatch(
        getMyTasks({
          idList: item.id,
          fromTask: 0,
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
        <Text style={styles.textHeader}>Мои задачи</Text>
      </View>
      <TabControl
        contentContainerStyle={styles.wrapperTab}
        initialId={1}
        data={taskSections}
        onChange={onChangeTab}
      />
      <View
        style={[
          styles.shadowWrapper,
          !!data?.length && { ...configApp.shadow },
        ]}
      >
        {/* {errorList?.code === 20007 ? (
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
        )} */}
      </View>
    </SafeAreaView>
  );
};

export default MyTasksScreen;
