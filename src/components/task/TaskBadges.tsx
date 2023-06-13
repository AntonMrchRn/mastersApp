import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import { Badge } from 'rn-ui-kit';

import { NightIcon } from '@/assets/icons/svg/screens/NightIcon';

type TaskBadgesProps = {
  isNight?: boolean;
  isUrgent?: boolean;
  statusID?: number;
};
export const TaskBadges: FC<TaskBadgesProps> = ({
  isNight,
  isUrgent,
  statusID,
}) => {
  const getBadges = () => {
    switch (statusID) {
      case 2:
        return (
          <Badge
            secondary={true}
            label={'Опубликовано'}
            icon={false}
            variant={'basic'}
            style={styles.badge}
          />
        );
      case 11:
        return (
          <Badge
            secondary={true}
            label={'В работе'}
            icon={false}
            variant={'accent'}
            style={styles.badge}
          />
        );
      case 5:
        return (
          <Badge
            secondary={true}
            label={'Сдача работ'}
            icon={false}
            variant={'warning'}
            style={styles.badge}
          />
        );
      case 6:
        return (
          <Badge
            secondary={true}
            label={'Ожидает оплаты'}
            icon={false}
            variant={'special'}
            style={styles.badge}
          />
        );
      case 9:
        return (
          <Badge
            secondary={true}
            label={'Оплачено'}
            icon={false}
            variant={'success'}
            style={styles.badge}
          />
        );
      case 7:
      case 8:
        return (
          <Badge
            secondary={true}
            label={'Отменено'}
            icon={false}
            variant={'danger'}
            style={styles.badge}
          />
        );
      case 12:
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
      marginRight: 4,
      marginVertical: 4,
    },
  });
  return (
    <View style={styles.badges}>
      {getBadges()}
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
    </View>
  );
};
