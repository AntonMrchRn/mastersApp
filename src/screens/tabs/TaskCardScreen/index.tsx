import React, { FC } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { StackScreenProps } from '@react-navigation/stack';
import { Badge } from 'rn-ui-kit';
import { Variant } from 'rn-ui-kit/lib/typescript/components/Badge';

import { NightIcon } from '@/assets/icons/svg/screens/NightIcon';
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
  type Badge = {
    label: string;
    icon: boolean | JSX.Element;
    variant: Variant;
    secondary?: boolean;
  };
  const badges: Badge[] = [
    { label: 'Опубликовано', icon: false, variant: 'basic', secondary: true },
    { label: 'Срочно', icon: true, variant: 'secondary', secondary: true },

    {
      label: 'Ночные работы',
      icon: <NightIcon />,
      variant: 'special',
      secondary: true,
    },
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
      </View>
    </SafeAreaView>
  );
};
