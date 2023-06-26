import React, { FC } from 'react';
import { View } from 'react-native';

import { Spacer, Text, useTheme } from 'rn-ui-kit';

import { TaskEstimateItem } from '@/components/task/TaskEstimateItem';
import { TaskEstimateOutline } from '@/components/task/TaskEstimateOutline';
import { Service } from '@/store/api/tasks/types';
import { OutlayStatusType, StatusType } from '@/types/task';

import { styles } from './styles';

type TaskCardEstimateProps = {
  services: Service[];
  outlayStatusID: OutlayStatusType | undefined;
  statusID: StatusType | undefined;
};

export const TaskCardEstimate: FC<TaskCardEstimateProps> = ({
  services,
  outlayStatusID,
  statusID,
}) => {
  const theme = useTheme();

  return (
    <View>
      <Spacer size={'xxxl'} />
      {/* {outlayStatusID && statusID === StatusType.WORK && ( */}
      <TaskEstimateOutline outlayStatusID={outlayStatusID} />
      <Text variant={'title3'} color={theme.text.basic} style={styles.mb8}>
        Перечень услуг и материалов
      </Text>
      {services.map(service => {
        return (
          <View key={service.ID}>
            <TaskEstimateItem service={service} />
            <Spacer size={0} separator="bottom" />
          </View>
        );
      })}
    </View>
  );
};
