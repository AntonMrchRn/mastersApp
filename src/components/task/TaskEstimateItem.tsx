import React, { FC } from 'react';
import { StyleSheet } from 'react-native';

import { Swipeable } from 'rn-ui-kit';

import { CalculatorIcon } from '@/assets/icons/svg/estimate/CalculatorIcon';
import { CubeIcon } from '@/assets/icons/svg/estimate/CubeIcon';
import { PriceIcon } from '@/assets/icons/svg/estimate/PriceIcon';
import { Service } from '@/store/api/tasks/types';

type TaskEstimateItemProps = {
  service: Service;
};
export const TaskEstimateItem: FC<TaskEstimateItemProps> = ({ service }) => {
  const items = [
    {
      text: `${service.price} ₽ за шт.`,
      icon: <PriceIcon />,
    },
    {
      text: `${service.count} шт.`,
      icon: <CubeIcon />,
    },
    {
      text: `${service.sum} ₽`,
      icon: <CalculatorIcon />,
    },
  ];
  const styles = StyleSheet.create({
    containerStyle: { paddingRight: 20, paddingHorizontal: 0 },
  });
  return (
    <Swipeable
      containerStyle={styles.containerStyle}
      variant={'default'}
      fistAction={function (): void {
        throw new Error('Function not implemented.');
      }}
      secondAction={function (): void {
        throw new Error('Function not implemented.');
      }}
      title={service?.name || ''}
      items={items}
    />
  );
};
