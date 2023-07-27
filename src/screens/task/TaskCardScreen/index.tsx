import React, { FC } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { StackScreenProps } from '@react-navigation/stack';
import {
  Banner,
  SegmentedControl,
  TabControl,
  Text,
  Tips,
  useTheme,
} from 'rn-ui-kit';

import Header from '@/components/Header';
import { TaskBadges } from '@/components/task/TaskBadges';
import { TaskCardBottom } from '@/components/task/TaskCard/TaskCardBottom';
import { TaskCardBudgetModal } from '@/components/task/TaskCard/TaskCardBudgetModal';
import { TaskCardCancelBottomSheet } from '@/components/task/TaskCard/TaskCardCancelBottomSheet';
import { TaskCardSubmissionBottomSheet } from '@/components/task/TaskCard/TaskCardSubmissionBottomSheet';
import { deviceWidth } from '@/constants/platform';
import { AppScreenName, AppStackParamList } from '@/navigation/AppNavigation';
import { StatusType, TaskType } from '@/types/task';

import { useTaskCard } from './useTaskCard';

import { styles } from './styles';

type TaskCardScreenProps = StackScreenProps<
  AppStackParamList,
  AppScreenName.TaskCard
>;

export const TaskCardScreen: FC<TaskCardScreenProps> = ({
  navigation,
  route,
}) => {
  // const taskId = route.params.taskId.toString();
  const taskId = '1223';
  // const taskId = '996';

  const {
    onTabChange,
    getCurrentTab,
    id,
    tabs,
    publicTime,
    name,
    budget,
    isNight,
    isUrgent,
    budgetEndTime,
    banner,
    getButtons,
    budgetModalVisible,
    onBudgetModalVisible,
    onRevokeBudget,
    cancelModalVisible,
    onCancelModalVisible,
    onCancelTask,
    subsetID,
    statusID,
    estimateBannerVisible,
    onEstimateBannerVisible,
    onEstimateBannerPress,
    ref,
    onCantDeleteBannerVisible,
    cantDeleteBannerVisible,
    outlayStatusID,
    onRefresh,
    refreshing,
    onSubmissionModalVisible,
    onTaskSubmission,
    submissionModalVisible,
    estimateTabsArray,
    onSwitchEstimateTab,
  } = useTaskCard({ taskId, navigation });
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <>
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <TaskCardSubmissionBottomSheet
          isVisible={submissionModalVisible}
          onCancel={onSubmissionModalVisible}
          onSubmit={onTaskSubmission}
        />
        <TaskCardBudgetModal
          isVisible={budgetModalVisible}
          onCancel={onBudgetModalVisible}
          onRevoke={onRevokeBudget}
        />
        <TaskCardCancelBottomSheet
          isVisible={cancelModalVisible}
          onCancel={onCancelModalVisible}
          onRefuse={onCancelTask}
        />
        <Header title={`Задача ID ${id}`} description={publicTime} />
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.wrapper,
            { paddingBottom: getButtons().length * 56 + 24 },
          ]}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.wrapper}>
            <View>
              <View style={styles.body}>
                <View style={styles.badges}>
                  <TaskBadges
                    outlayStatusID={outlayStatusID}
                    isNight={isNight}
                    isUrgent={isUrgent}
                    statusID={statusID}
                  />
                </View>
                <Text
                  variant="title2"
                  style={styles.title}
                  color={theme.text.basic}
                >
                  {name}
                </Text>
                <Text
                  variant="title3"
                  style={styles.price}
                  color={theme.text.basic}
                >
                  {budget}
                </Text>
                {statusID === StatusType.ACTIVE &&
                  subsetID !== TaskType.COMMON_FIRST_RESPONSE &&
                  budgetEndTime && (
                    <Tips
                      type={'warning'}
                      text={budgetEndTime}
                      containerStyle={styles.tips}
                    />
                  )}
              </View>
              <TabControl
                ref={ref}
                data={tabs}
                initialId={0}
                onChange={onTabChange}
                style={styles.mt16}
                contentContainerStyle={styles.contentContainerTab}
              />
              <View
                style={{
                  paddingHorizontal: 20,
                  marginTop: 24,
                }}
              >
                <SegmentedControl
                  tabs={estimateTabsArray}
                  onChange={onSwitchEstimateTab}
                  width={deviceWidth - 40}
                />
              </View>
            </View>
            <View style={styles.card}>{getCurrentTab()}</View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <View style={[styles.bottom, { bottom: insets.bottom }]}>
        {estimateBannerVisible && (
          <View style={styles.mb16}>
            <Banner
              type={'error'}
              icon={'alert'}
              title={'Смета не согласована'}
              text="Перед сдачей задачи координатор должен согласовать смету"
              buttonText="Перейти в Смету"
              onClosePress={onEstimateBannerVisible}
              onButtonPress={onEstimateBannerPress}
            />
          </View>
        )}
        {cantDeleteBannerVisible && (
          <View style={styles.mb16}>
            <Banner
              type={'error'}
              icon={'alert'}
              text="Нельзя полностью удалить все услуги из сметы"
              onClosePress={onCantDeleteBannerVisible}
            />
          </View>
        )}
        <TaskCardBottom banner={banner} buttons={getButtons()} />
      </View>
    </>
  );
};
