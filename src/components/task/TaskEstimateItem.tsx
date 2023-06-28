import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import { Swipeable } from 'rn-ui-kit';
import { Variant } from 'rn-ui-kit/lib/typescript/components/Swipeable';

import { CalculatorIcon } from '@/assets/icons/svg/estimate/CalculatorIcon';
import { CubeIcon } from '@/assets/icons/svg/estimate/CubeIcon';
import { PriceIcon } from '@/assets/icons/svg/estimate/PriceIcon';
import { RoleType } from '@/types/task';

type TaskEstimateItemProps = {
  previewActions?: boolean;
  firstAction: () => void;
  secondAction: () => void;
  title?: string;
  price?: number;
  count?: number;
  sum?: number;
  roleID: RoleType;
  canSwipe: boolean;
};
export const TaskEstimateItem: FC<TaskEstimateItemProps> = ({
  previewActions,
  firstAction,
  secondAction,
  title = '',
  price = 0,
  count = 0,
  sum = 0,
  roleID,
  canSwipe,
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

  const getVariant = (): Variant => {
    switch (roleID) {
      case RoleType.EXTERNAL_EXECUTOR:
      case RoleType.INTERNAL_EXECUTOR:
        return 'user';
      case RoleType.COORDINATOR:
        return 'coordinator';
      default:
        return 'default';
    }
  };
  const getLabel = (): string => {
    switch (roleID) {
      case RoleType.EXTERNAL_EXECUTOR:
      case RoleType.INTERNAL_EXECUTOR:
        return 'Изменено исполнителем';
      case RoleType.COORDINATOR:
        return 'Изменено координатором';
      default:
        return '';
    }
  };

  const styles = StyleSheet.create({
    containerStyle: { paddingRight: 20, paddingHorizontal: 0 },
    wrapper: { width: '100%' },
  });

  return (
    <View style={styles.wrapper}>
      <Swipeable
        label={getLabel()}
        containerStyle={styles.containerStyle}
        variant={getVariant()}
        previewActions={previewActions}
        firstAction={firstAction}
        secondAction={secondAction}
        title={title}
        items={items}
        canSwipe={canSwipe}
      />
    </View>
  );
};
