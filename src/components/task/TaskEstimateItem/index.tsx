import React, { FC } from 'react';
import { View } from 'react-native';

import plural from 'plural-ru';
import { Swipeable } from 'rn-ui-kit';
import { Variant } from 'rn-ui-kit/lib/typescript/components/Swipeable';

import { CalculatorIcon } from '@/assets/icons/svg/estimate/CalculatorIcon';
import { CubeIcon } from '@/assets/icons/svg/estimate/CubeIcon';
import { PriceIcon } from '@/assets/icons/svg/estimate/PriceIcon';
import { useAppSelector } from '@/store';
import { selectAuth } from '@/store/slices/auth/selectors';
import { OutlayStatusType, RoleType, StatusType, TaskType } from '@/types/task';
import { separateThousands } from '@/utils/separateThousands';

import { styles } from './styles';

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
  statusID: StatusType | undefined;
  subsetID: TaskType | undefined;
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
  statusID,
  subsetID,
}) => {
  const userRoleId = useAppSelector(selectAuth).user?.roleID;
  const isInternalExecutor = userRoleId === RoleType.INTERNAL_EXECUTOR;

  const currentMeasure =
    measure === 'час'
      ? plural(count, '%d час', '%d часa', '%d часов')
      : `${separateThousands(count)} ${measure}`;

  const items = [
    ...(!isInternalExecutor
      ? [
          {
            text: `${separateThousands(price)} ₽ ${
              measure === 'пустое' ? '' : `за ${measure}`
            }`,
            icon: <PriceIcon />,
          },
        ]
      : []),
    {
      text: measure === 'пустое' ? count.toString() : currentMeasure,
      icon: <CubeIcon />,
    },
    ...(!isInternalExecutor
      ? [
          {
            text: `${separateThousands(sum)} ₽`,
            icon: <CalculatorIcon />,
          },
        ]
      : []),
  ];

  const getVariant = (): Variant => {
    if (
      outlayStatusID &&
      statusID &&
      subsetID &&
      statusID !== StatusType.ACTIVE &&
      [OutlayStatusType.RETURNED, OutlayStatusType.MATCHING].includes(
        outlayStatusID
      ) &&
      [
        TaskType.COMMON_FIRST_RESPONSE,
        TaskType.IT_FIRST_RESPONSE,
        TaskType.IT_INTERNAL_EXECUTIVES,
      ].includes(subsetID)
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
      statusID &&
      statusID !== StatusType.ACTIVE &&
      [OutlayStatusType.RETURNED, OutlayStatusType.MATCHING].includes(
        outlayStatusID
      )
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

  return (
    <View style={styles.wrapper}>
      <Swipeable
        itemContainerStyle={styles.item}
        itemTextStyle={styles.item}
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
        labelPosition={isInternalExecutor ? 'bottom' : 'top'}
      />
    </View>
  );
};
