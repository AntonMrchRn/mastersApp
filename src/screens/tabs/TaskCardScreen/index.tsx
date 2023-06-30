import React, { FC } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { StackScreenProps } from '@react-navigation/stack';
import { TabControl, Text, Tips, useTheme } from 'rn-ui-kit';

import Header from '@/components/Header';
import { TaskCardBottom } from '@/components/TabScreens/TaskCard/TaskCardBottom';
import { TaskCardBudgetModal } from '@/components/TabScreens/TaskCard/TaskCardBudgetModal';
import { TaskCardCancelBottomSheet } from '@/components/TabScreens/TaskCard/TaskCardCancelBottomSheet';
import { TaskBadges } from '@/components/task/TaskBadges';
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
  const taskId = route.params.taskId.toString();
  const {
    tabs,
    onTabChange,
    getCurrentTab,
    id,
    publicTime,
    name,
    budget,
    isNight,
    isUrgent,
    budgetEndTime,
    getBanner,
    getButtons,
    budgetModalVisible,
    onBudgetModalVisible,
    onRevokeBudget,
    cancelModalVisible,
    onCancelModalVisible,
    onCancelTask,
    subsetID,
    statusID,
  } = useTaskCard({ taskId, navigation });
  const theme = useTheme();

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
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
        contentContainerStyle={styles.wrapper}
      >
        <View style={styles.wrapper}>
          <View>
            <View style={styles.body}>
              <View style={styles.badges}>
                <TaskBadges
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
                subsetID !== TaskType.COMMON_FIRST_RESPONCE && (
                  <Tips
                    type={'warning'}
                    text={budgetEndTime}
                    containerStyle={styles.tips}
                  />
                )}
            </View>
            <TabControl
              data={tabs}
              initialId={0}
              onChange={onTabChange}
              style={styles.mt16}
              contentContainerStyle={styles.contentContainerTab}
            />
          </View>
          <View style={styles.card}>{getCurrentTab()}</View>
        </View>
      </ScrollView>
      <View style={styles.bottom}>
        <TaskCardBottom banner={getBanner()} buttons={getButtons()} />
      </View>
    </SafeAreaView>
  );
};
