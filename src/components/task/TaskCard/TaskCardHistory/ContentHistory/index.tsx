import React, { FC } from 'react';
import { View } from 'react-native';

import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import { Text, useTheme } from 'rn-ui-kit';

import { CalculatorIcon } from '@/assets/icons/svg/screens/EventsType/CalculatorIcon';
import { CancelExucatorIcon } from '@/assets/icons/svg/screens/EventsType/CancelExucatorIcon';
import { ChangingIcon } from '@/assets/icons/svg/screens/EventsType/ChangingIcon';
import { ConfirmedIcon } from '@/assets/icons/svg/screens/EventsType/ConfirmedIcon';
import { ErrorIcon } from '@/assets/icons/svg/screens/EventsType/ErrorIcon';
import { MoneyIcon } from '@/assets/icons/svg/screens/EventsType/MoneyIcon';
import { NewExucatorIcon } from '@/assets/icons/svg/screens/EventsType/NewExucatorIcon';
import { TaskCancelIcon } from '@/assets/icons/svg/screens/EventsType/TaskCancelIcon';
import { TaskCreateIcon } from '@/assets/icons/svg/screens/EventsType/TaskCreateIcon';
import { UserIcon } from '@/assets/icons/svg/screens/EventsType/UserIcon';
import { Task } from '@/store/api/tasks/types';

import { styles } from './styles';

dayjs.extend(updateLocale);

type ItemHistory = {
  ID?: number;
  recipientID?: number;
  comment?: string;
  creationTime?: string;
  systemEventID?: number;
};

type TaskCardProps = {
  history: { taskComment?: Task[] };
};

export const ContentHistory: FC<TaskCardProps> = ({
  history: { taskComment },
}) => {
  const theme = useTheme();

  const getIcon = (systemEventID?: number) => {
    switch (systemEventID) {
      case 1:
        return <CalculatorIcon />;
      case 2:
        return <UserIcon />;
      case 3:
        return <TaskCreateIcon />;
      case 4:
        return <TaskCancelIcon />;
      case 5:
        return <NewExucatorIcon />;
      case 6:
        return <CancelExucatorIcon />;
      case 7:
      case 8:
        return <CalculatorIcon />;
      case 9:
        return <ChangingIcon />;
      case 10:
        return <MoneyIcon />;
      case 11:
        return <ConfirmedIcon />;
      case 12:
        return <ErrorIcon />;
      default:
        return <></>;
    }
  };

  return taskComment?.map((item: ItemHistory) => {
    return (
      <View style={styles.wrapperItem} key={item.ID}>
        <View style={styles.itemIcon}>{getIcon(item.systemEventID)}</View>
        <View style={styles.itemInfo}>
          <Text
            variant="bodyMBold"
            style={styles.desc}
            color={theme.text.basic}
          >
            {item.comment}
          </Text>
          <Text
            variant="bodySRegular"
            style={[styles.desc, styles.dayStyle]}
            color={theme.text.neutral}
          >
            {dayjs(item.creationTime).format('M MMMM в HH:mm')}
          </Text>
        </View>
      </View>
    );
  });
};
