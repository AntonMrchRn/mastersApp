import React, { FC } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { StackScreenProps } from '@react-navigation/stack';
import { Card, TabControl, Text, Tips, useTheme } from 'rn-ui-kit';

import { TaskCardBottom } from '@/components/TabScreens/TaskCard/TaskCardBottom';
import { TaskCardBudgetModal } from '@/components/TabScreens/TaskCard/TaskCardBudgetModal';
import { TaskCardCancelBottomSheet } from '@/components/TabScreens/TaskCard/TaskCardCancelBottomSheet';
import { TaskCardHeader } from '@/components/TabScreens/TaskCard/TaskCardHeader';
import { TaskBadges } from '@/components/task/TaskBadges';
import {
  TaskSearchNavigationParamList,
  TaskSearchNavigatorScreenName,
} from '@/types/navigation';

import { useTaskCard } from './useTaskCard';

import { styles } from './styles';

type TaskCardScreenProps = StackScreenProps<
  TaskSearchNavigationParamList,
  TaskSearchNavigatorScreenName.TaskCard
>;

export const TaskCardScreen: FC<TaskCardScreenProps> = ({ navigation }) => {
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
    statusCode,
    budgetEndTime,
    getBanner,
    getButtons,
    budgetModalVisible,
    onBudgetModalVisible,
    onRevokeBudget,
    cancelModalVisible,
    onCancelModalVisible,
    onCancelTask,
  } = useTaskCard();
  const theme = useTheme();
  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
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
      <TaskCardHeader
        goBack={goBack}
        title={`Задача ID ${id}`}
        description={publicTime}
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.wrapper}
      >
        <View style={styles.wrapper}>
          <View style={styles.body}>
            <View style={styles.badges}>
              <TaskBadges
                isNight={isNight}
                isUrgent={isUrgent}
                statusCode={statusCode}
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
            {statusCode === 'active' && (
              <Tips
                type={'warning'}
                text={budgetEndTime}
                containerStyle={styles.tips}
              />
            )}
            <TabControl data={tabs} initialId={0} onChange={onTabChange} />
          </View>
          <Card isShadow style={styles.card}>
            {getCurrentTab()}
            <View style={styles.bottom}>
              <TaskCardBottom banner={getBanner()} buttons={getButtons()} />
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
