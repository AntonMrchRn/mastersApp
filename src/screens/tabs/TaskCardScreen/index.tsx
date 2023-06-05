import React, { FC } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { StackScreenProps } from '@react-navigation/stack';
import { Badge } from 'rn-ui-kit';
import { Variant } from 'rn-ui-kit/lib/typescript/components/Badge';

import { TaskCardHeader } from '@/components/TaskCardHeader';
import {
  TaskSearchNavigationParamList,
  TaskSearchNavigatorScreenName,
} from '@/types/navigation';

import { styles } from './styles';

type TaskCardScreenProps = StackScreenProps<
  TaskSearchNavigationParamList,
  TaskSearchNavigatorScreenName.TaskCard
>;
export const TaskCardScreen: FC<TaskCardScreenProps> = ({ navigation }) => {
  type Badge = { label: string; icon: boolean | JSX.Element; variant: Variant };
  const badges: Badge[] = [
    { label: 'Опубликовано', icon: false, variant: 'basic' },
    { label: 'Срочно', icon: true, variant: 'accent' },
    { label: 'Ночные работы', icon: true, variant: 'accent' },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <TaskCardHeader
        navigation={navigation}
        title={'Задача ID 32996'}
        description={'Опубликовано 10 апреля в 23:52'}
      />
      <View style={styles.body}>
        <View style={styles.badges}>
          {badges.map(badge => (
            <View style={styles.badge} key={badge.label}>
              <Badge
                label={badge.label}
                icon={badge.icon}
                variant={badge.variant}
              />
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};
