import React, { FC } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { StackScreenProps } from '@react-navigation/stack';
import { Badge, Card, TabControl, Text, Tips, useTheme } from 'rn-ui-kit';

import { TaskCardHeader } from '@/components/TabScreens/TaskCard/TaskCardHeader';
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
  const { getBadges, tabs, onTabChange, getCurrentTab } = useTaskCard();
  const theme = useTheme();
  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <TaskCardHeader
        goBack={goBack}
        title={'Задача ID 32996'}
        description={'Опубликовано 10 апреля в 23:52'}
      />
      <ScrollView style={styles.scrollView}>
        <View style={styles.body}>
          <View style={styles.badges}>
            {getBadges().map(badge => (
              <Badge
                secondary={badge?.secondary}
                label={badge.label}
                icon={badge.icon}
                variant={badge.variant}
                style={styles.badge}
                key={badge.label}
              />
            ))}
          </View>
          <Text variant="title2" style={styles.title} color={theme.text.basic}>
            Какое-то длинное название задания на 2-3 строчки
          </Text>
          <Text variant="title3" style={styles.price} color={theme.text.basic}>
            18 000 ₽
          </Text>
          <Tips
            type={'warning'}
            text="Срок подачи сметы до 10 апреля 19:00"
            containerStyle={styles.tips}
          />
          <TabControl data={tabs} initialId={0} onChange={onTabChange} />
        </View>
        <Card isShadow style={styles.card}>
          {getCurrentTab()}
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};
