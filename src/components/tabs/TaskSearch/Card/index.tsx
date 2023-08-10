import React, { memo } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Card, Spacer, Text } from 'rn-ui-kit';

import { TaskAddress } from '@/components/task/TaskAddress';
import { TaskBadges } from '@/components/task/TaskBadges';
import { TaskDate } from '@/components/task/TaskDate';
import { Task } from '@/store/api/tasks/types';

import { styles } from './styles';

type CardTasksProp = Task & {
  onItemPress: (id: number) => void;
};

const CardTasks = ({
  object,
  startTime = '',
  endTimePlan = '',
  name,
  description,
  statusID,
  isUrgent,
  isNight,
  ID,
  onItemPress,
  outlayStatusID,
  currentSum,
}: CardTasksProp) => {
  const address = object?.name || '';

  const onPress = () => {
    if (typeof ID === 'number') {
      onItemPress(ID);
    }
  };
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Card style={styles.wrapper}>
        <>
          <View style={styles.wrapperBadge}>
            <TaskBadges
              outlayStatusID={outlayStatusID}
              statusID={statusID}
              isUrgent={isUrgent}
              isNight={isNight}
              useOutlayStatus
            />
          </View>
          <Text variant="bodySRegular" style={styles.wrapperTitle}>
            Номер задачи: {ID}
          </Text>
          <Text variant="title3" style={styles.wrapperTitle}>
            {name}
          </Text>
          {currentSum && (
            <Text variant="title2" style={styles.price}>
              {currentSum} ₽
            </Text>
          )}
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
