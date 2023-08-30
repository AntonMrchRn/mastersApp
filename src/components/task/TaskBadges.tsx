import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import { Badge } from 'rn-ui-kit';

import { NightIcon } from '@/assets/icons/svg/screens/NightIcon';
import { OutlayStatusType, StatusType } from '@/types/task';

type TaskBadgesProps = {
  isNight?: boolean;
  isUrgent?: boolean;
  statusID?: StatusType;
  outlayStatusID?: OutlayStatusType;
  useOutlayStatus?: boolean;
  toClose: boolean | undefined;
};
export const TaskBadges: FC<TaskBadgesProps> = ({
  isNight,
  isUrgent,
  statusID,
  outlayStatusID,
  useOutlayStatus,
  toClose,
}) => {
  const getBadges = () => {
    if (toClose) {
      return (
        <Badge
          secondary={true}
          label={'К закрытию'}
          icon={false}
          variant={'success'}
          style={styles.badge}
        />
      );
    }
    switch (statusID) {
      case StatusType.PENDING:
        return (
          <Badge
            secondary={true}
            label={'Подготовка'}
            icon={false}
            variant={'basic'}
            style={styles.badge}
          />
        );
      case StatusType.ACTIVE:
        return (
          <Badge
            secondary={true}
            label={'Опубликовано'}
            icon={false}
            variant={'basic'}
            style={styles.badge}
          />
        );
      case StatusType.WORK:
        if (useOutlayStatus) {
          switch (outlayStatusID) {
            case OutlayStatusType.READY:
              return (
                <Badge
                  variant="success"
                  label="Смета согласована"
                  secondary
                  style={styles.badge}
                />
              );
            case OutlayStatusType.PENDING:
              return (
                <Badge
                  variant="warning"
                  label="Смета не согласована"
                  secondary
                  style={styles.badge}
                />
              );
            case OutlayStatusType.RETURNED:
              return (
                <Badge
                  variant="danger"
                  label="Смета возвращена"
                  secondary
                  style={styles.badge}
                />
              );
            case OutlayStatusType.MATCHING:
              return (
                <Badge
                  variant="accent"
                  label="Смета на согласовании"
                  secondary
                  style={styles.badge}
                />
              );
            default:
              return (
                <Badge
                  secondary={true}
                  label={'В работе'}
                  icon={false}
                  variant={'accent'}
                  style={styles.badge}
                />
              );
          }
        }
        return (
          <Badge
            secondary={true}
            label={'В работе'}
            icon={false}
            variant={'accent'}
            style={styles.badge}
          />
        );
      case StatusType.SUMMARIZING:
        return (
          <Badge
            secondary={true}
            label={'Сдача работ'}
            icon={false}
            variant={'warning'}
            style={styles.badge}
          />
        );
      case StatusType.COMPLETED:
        return (
          <Badge
            secondary={true}
            label={'Ожидает оплаты'}
            icon={false}
            variant={'special'}
            style={styles.badge}
          />
        );
      case StatusType.PAID:
        return (
          <Badge
            secondary={true}
            label={'Оплачено'}
            icon={false}
            variant={'success'}
            style={styles.badge}
          />
        );
      case StatusType.CANCELLED_BY_EXECUTOR:
      case StatusType.CANCELLED_BY_CUSTOMER:
        return (
          <Badge
            secondary={true}
            label={'Отменено'}
            icon={false}
            variant={'danger'}
            style={styles.badge}
          />
        );
      case StatusType.CLOSED:
        return (
          <Badge
            secondary={true}
            label={'Закрыто'}
            icon={false}
            variant={'basic'}
            style={styles.badge}
          />
        );
      default:
        return null;
    }
  };
  const styles = StyleSheet.create({
    badges: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    badge: {
      marginRight: 8,
      marginVertical: 4,
    },
  });
  return (
    <View style={styles.badges}>
      {getBadges()}
      {!!statusID &&
        !![StatusType.ACTIVE, StatusType.WORK].includes(statusID) && (
          <>
            {isUrgent && (
              <Badge
                secondary={true}
                label={'Срочно'}
                icon={true}
                variant={'secondary'}
                style={styles.badge}
              />
            )}
            {isNight && (
              <Badge
                secondary={true}
                label={'Ночные работы'}
                icon={<NightIcon />}
                variant={'special'}
                style={styles.badge}
              />
            )}
          </>
        )}
    </View>
  );
};
