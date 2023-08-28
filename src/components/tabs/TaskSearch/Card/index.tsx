import React, { memo } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Card, Spacer, Text } from 'rn-ui-kit';

import { TaskAddress } from '@/components/task/TaskAddress';
import { TaskBadges } from '@/components/task/TaskBadges';
import { TaskDate } from '@/components/task/TaskDate';
import { isDev } from '@/constants/platform';
import { Task } from '@/store/api/tasks/types';
import { RoleType } from '@/types/task';

import { styles } from './styles';

type CardTasksProp = Task & {
  onItemPress: (id: number) => void;
  userRole: RoleType | undefined;
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
  toClose,
  userRole,
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
              toClose={toClose}
            />
          </View>
          {isDev && (
            <Text variant="bodySRegular" style={styles.wrapperTitle}>
              Номер задачи: {ID}
            </Text>
          )}
          <Text variant="title3" style={styles.wrapperTitle} numberOfLines={2}>
            {name}
          </Text>
          {currentSum && userRole !== RoleType.INTERNAL_EXECUTOR && (
            <Text variant="title2" style={styles.price}>
              {currentSum} ₽
            </Text>
          )}
          <Text variant="bodySRegular" numberOfLines={3}>
            {description}
          </Text>
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
