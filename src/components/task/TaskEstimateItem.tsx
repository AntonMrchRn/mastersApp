import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import plural from 'plural-ru';
import { Swipeable } from 'rn-ui-kit';
import { Variant } from 'rn-ui-kit/lib/typescript/components/Swipeable';

import { CalculatorIcon } from '@/assets/icons/svg/estimate/CalculatorIcon';
import { CubeIcon } from '@/assets/icons/svg/estimate/CubeIcon';
import { PriceIcon } from '@/assets/icons/svg/estimate/PriceIcon';
import { OutlayStatusType, RoleType } from '@/types/task';

type TaskEstimateItemProps = {
  previewActions?: boolean;
  firstAction: () => void;
  secondAction: () => void;
  title?: string;
  price?: number;
  count?: number;
  sum?: number;
  roleID: RoleType;
  canSwipe?: boolean;
  measure: string | undefined;
  outlayStatusID: OutlayStatusType | undefined;
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
  measure = '',
  outlayStatusID,
}) => {
  console.log('🚀 ~ file: TaskEstimateItem.tsx:39 ~ roleID:', roleID);
  const currentMeasure =
    measure === 'час'
      ? plural(count, '%d час', '%d часa', '%d часов')
      : `${count} ${measure}`;

  const items = [
    {
      text: `${price} ₽ ${measure === 'пустое' ? '' : `за ${measure}`}`,
      icon: <PriceIcon />,
    },
    {
      text: measure === 'пустое' ? count.toString() : currentMeasure,
      icon: <CubeIcon />,
    },
    {
      text: `${sum} ₽`,
      icon: <CalculatorIcon />,
    },
  ];

  const getVariant = (): Variant => {
    if (
      outlayStatusID &&
      [OutlayStatusType.PENDING, OutlayStatusType.RETURNED].includes(
        outlayStatusID
      )
    ) {
      switch (roleID) {
        case RoleType.EXTERNAL_EXECUTOR:
        case RoleType.INTERNAL_EXECUTOR:
          return 'user';
        case RoleType.COORDINATOR:
        case RoleType.SUPERVISOR:
        case RoleType.CLIENT:
          return 'coordinator';
        default:
          return 'default';
      }
    }
    return 'default';
  };

  const getLabel = (): string => {
    if (
      outlayStatusID &&
      [
        OutlayStatusType.PENDING,
        OutlayStatusType.RETURNED,
        OutlayStatusType.READY,
      ].includes(outlayStatusID)
    ) {
      switch (roleID) {
        case RoleType.EXTERNAL_EXECUTOR:
        case RoleType.INTERNAL_EXECUTOR:
          return 'Изменено исполнителем';
        case RoleType.COORDINATOR:
        case RoleType.SUPERVISOR:
        case RoleType.CLIENT:
          return 'Изменено координатором';
        default:
          return '';
      }
    }
    return '';
  };

  const styles = StyleSheet.create({
    containerStyle: { paddingRight: 20, paddingHorizontal: 20 },
    wrapper: { flexGrow: 1, marginHorizontal: -20 },
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
        canSwipe={
          canSwipe &&
          outlayStatusID &&
          [
            OutlayStatusType.PENDING,
            OutlayStatusType.RETURNED,
            OutlayStatusType.READY,
          ].includes(outlayStatusID)
        }
      />
    </View>
  );
};
