import React from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import { ShadowedView } from 'react-native-fast-shadow';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
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
import { configApp, deviceWidth } from '@/constants/platform';
import { AppScreenName, AppStackParamList } from '@/navigation/AppNavigation';
import { BottomTabParamList } from '@/navigation/TabNavigation';
import { StatusType, TaskType } from '@/types/task';

import { useTaskCard } from './useTaskCard';

import { styles } from './styles';

type TaskCardScreenProps = CompositeScreenProps<
  StackScreenProps<AppStackParamList, AppScreenName.TaskCard>,
  BottomTabScreenProps<BottomTabParamList>
>;
export const TaskCardScreen = ({ navigation, route }: TaskCardScreenProps) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const taskId = route.params.taskId.toString();

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
    isContractor,
    banner,
    buttons,
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
    tab,
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
    isEstimateTabs,
    onNoAccessToTaskBannerVisible,
    noAccessToTaskBannerVisible,
    noAccessButtonPress,
    toClose,
  } = useTaskCard({ taskId, navigation });

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
          isContractor={isContractor}
          onCancel={onCancelModalVisible}
          onRefuse={onCancelTask}
          withReason={
            !(
              subsetID === TaskType.IT_FIRST_RESPONSE &&
              statusID === StatusType.ACTIVE
            )
          }
        />
        <Header title={`Задача ID ${id}`} description={publicTime} />
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.wrapper,
            { paddingBottom: buttons.length * 56 + 24 },
          ]}
          showsVerticalScrollIndicator={false}
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
                    toClose={toClose}
                  />
                </View>
                <Text
                  variant="title2"
                  style={styles.title}
                  color={theme.text.basic}
                >
                  {name}
                </Text>
                {!!budget && (
                  <Text
                    variant="title3"
                    style={styles.price}
                    color={theme.text.basic}
                  >
                    {budget}
                  </Text>
                )}
                {statusID === StatusType.ACTIVE &&
                  subsetID !== TaskType.COMMON_FIRST_RESPONSE &&
                  budgetEndTime && (
                    <Tips
                      type={'info'}
                      text={budgetEndTime}
                      containerStyle={styles.tips}
                    />
                  )}
              </View>
              <TabControl
                data={tabs}
                currentTabId={tab.id}
                onChange={onTabChange}
                style={styles.mt16}
                contentContainerStyle={styles.contentContainerTab}
              />
              {isEstimateTabs && (
                <View style={styles.segment}>
                  <SegmentedControl
                    tabs={estimateTabsArray}
                    onChange={onSwitchEstimateTab}
                    width={deviceWidth - 40}
                  />
                </View>
              )}
            </View>
            <ShadowedView style={[styles.card, configApp.shadow]}>
              {getCurrentTab()}
            </ShadowedView>
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
        {noAccessToTaskBannerVisible && (
          <View style={styles.mb16}>
            <Banner
              type={'error'}
              title="Аккаунт не подтвержден"
              icon={'alert'}
              text="Для выполнения задач необходимо заполнить данные учетной записи"
              onClosePress={onNoAccessToTaskBannerVisible}
              buttonText="Перейти в Профиль"
              onButtonPress={noAccessButtonPress}
            />
          </View>
        )}
        <TaskCardBottom banner={banner} buttons={buttons} />
      </View>
    </>
  );
};
