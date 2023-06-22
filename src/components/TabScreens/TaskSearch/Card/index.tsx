import React, { FC, memo } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Card, Spacer, Text } from 'rn-ui-kit';

import { TaskAddress } from '@/components/task/TaskAddress';
import { TaskBadges } from '@/components/task/TaskBadges';
import { TaskDate } from '@/components/task/TaskDate';
import { Task } from '@/store/api/tasks/types';
import {
  TaskCardScreenNavigationProp,
  TaskSearchNavigatorScreenName,
} from '@/types/navigation';

import { styles } from './styles';

type CardTasksProp = Task & {
  navigation: TaskCardScreenNavigationProp;
};

const CardTasks: FC<CardTasksProp> = ({
  object,
  startTime = '',
  endTimePlan = '',
  name,
  description,
  navigation,
  statusID,
  isUrgent,
  isNight,
  ID,
}) => {
  const address = object?.name || '';

  const onPress = () => {
    if (typeof ID === 'number') {
      navigation.navigate(TaskSearchNavigatorScreenName.TaskCard, {
        taskId: ID,
      });
    }
  };
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Card style={styles.wrapper}>
        <>
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
          {(startTime || endTimePlan) && (
            <TaskDate from={startTime} to={endTimePlan} />
          )}
        </>
      </Card>
      <Spacer size="xs" separator="bottom" />
    </TouchableOpacity>
  );
};

export default memo(CardTasks);
