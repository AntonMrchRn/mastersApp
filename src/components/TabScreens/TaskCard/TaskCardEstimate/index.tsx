import React, { FC } from 'react';
import { View } from 'react-native';

import { Spacer, Text, useTheme } from 'rn-ui-kit';

import { TaskEstimateItem } from '@/components/task/TaskEstimateItem';
import { Service } from '@/store/api/tasks/types';

import { styles } from './styles';

type TaskCardEstimateProps = {
  services: Service[];
};

export const TaskCardEstimate: FC<TaskCardEstimateProps> = ({ services }) => {
  console.log('🚀 ~ file: index.tsx:15 ~ services:', services);
  const theme = useTheme();

  return (
    <View>
      <Spacer size={'xxxl'} />
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
