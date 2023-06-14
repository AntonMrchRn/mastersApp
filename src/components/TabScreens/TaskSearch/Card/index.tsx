import React, { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Card, Spacer, Text } from 'rn-ui-kit';

import { TaskAddress } from '@/components/task/TaskAddress';
import { TaskBadges } from '@/components/task/TaskBadges';
import { TaskDate } from '@/components/task/TaskDate';
import { Task } from '@/store/api/tasks/types';
import { TaskCardScreenNavigationProp } from '@/types/navigation';

import { styles } from './styles';

type CardTasksProp = Task & {
  navigation: TaskCardScreenNavigationProp;
};

export const CardTasks: FC<CardTasksProp> = ({
  object,
  startTime = '',
  endTimePlan = '',
  name,
  description,
  navigation,
  statusID,
  isUrgent,
  isNight,
}) => {
  const address = object?.name || '';

  return (
    <TouchableOpacity
      style={styles.btn}
      onPress={() => navigation.navigate('TaskCard')}
    >
      <Card style={styles.wrapper}>
        <View style={styles.wrapperBadge}>
          <TaskBadges
            statusID={statusID}
            isUrgent={isUrgent}
            isNight={isNight}
          />
        </View>
        <Text variant="title3" style={styles.wrapperTitle}>
          {name}
        </Text>
        <Text variant="bodySRegular">{description}</Text>
        <View style={styles.wrapperAddress}>
          <TaskAddress address={address} />
        </View>
        <TaskDate from={startTime} to={endTimePlan} />
      </Card>
      <Spacer size="xs" separator="bottom" />
    </TouchableOpacity>
  );
};
