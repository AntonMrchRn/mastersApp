import React, { FC } from 'react';
import { View } from 'react-native';

import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import { Text, useTheme } from 'rn-ui-kit';

import { Task } from '@/store/api/tasks/types';

import { styles } from './styles';

dayjs.extend(updateLocale);

type ItemHistory = {
  recipientID?: number;
  comment?: string;
  creationTime?: string;
};

type TaskCardProps = {
  history?: { data?: { taskComment?: Task[] } };
};

export const ContentHistory: FC<TaskCardProps> = ({ history }) => {
  const theme = useTheme();

  dayjs.updateLocale('ru', {
    months: [
      'Января',
      'Февраля',
      'Марта',
      'Апреля',
      'Мая',
      'Июня',
      'Июля',
      'Августа',
      'Сентября',
      'Октября',
      'Ноября',
      'Декабря',
    ],
  });

  //local('ru') попробывать в dayjs().format()

  return (
    history?.data?.taskComment !== undefined &&
    history?.data?.taskComment.map((item: ItemHistory) => {
      return (
        <View style={styles.wrapperItem} key={item.recipientID}>
          <View style={styles.itemIcon} />
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
    })
  );
};
