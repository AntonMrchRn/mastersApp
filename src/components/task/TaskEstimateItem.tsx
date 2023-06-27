import React, { FC } from 'react';
import { StyleSheet } from 'react-native';

import { Swipeable } from 'rn-ui-kit';

import { CalculatorIcon } from '@/assets/icons/svg/estimate/CalculatorIcon';
import { CubeIcon } from '@/assets/icons/svg/estimate/CubeIcon';
import { PriceIcon } from '@/assets/icons/svg/estimate/PriceIcon';

type TaskEstimateItemProps = {
  previewActions?: boolean;
  firstAction: () => void;
  secondAction: () => void;
  title?: string;
  price?: number;
  count?: number;
  sum?: number;
};
export const TaskEstimateItem: FC<TaskEstimateItemProps> = ({
  previewActions,
  firstAction,
  secondAction,
  title = '',
  price = 0,
  count = 0,
  sum = 0,
}) => {
  const items = [
    {
      text: `${price} ₽ за шт.`,
      icon: <PriceIcon />,
    },
    {
      text: `${count} шт.`,
      icon: <CubeIcon />,
    },
    {
      text: `${sum} ₽`,
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
      previewActions={previewActions}
      firstAction={firstAction}
      secondAction={secondAction}
      title={title}
      items={items}
    />
  );
};
