import React, { FC } from 'react';
import { View } from 'react-native';

import dayjs from 'dayjs';
import { Text, useTheme } from 'rn-ui-kit';

import { CalendarCheckIcon } from '@/assets/icons/svg/screens/CalendarCheckIcon';

import { styles } from './styles';

type TaskDateProps = {
  from: string;
  to: string;
  textColor?: string;
};
export const TaskDate: FC<TaskDateProps> = ({ from, to, textColor }) => {
  const theme = useTheme();

  const color = textColor || theme.text.neutral;

  const inOneMonth = !!(
    from &&
    to &&
    dayjs(from).year() === dayjs(to).year() &&
    dayjs(from).month() === dayjs(to).month()
  );

  return (
    <View style={styles.date}>
      <View style={styles.wrapperIcon}>
        <CalendarCheckIcon fill={color} />
      </View>
      {inOneMonth ? (
        <Text variant="captionRegular" color={color} style={styles.ml10}>
          {`${dayjs(from).format('D')}`}-{`${dayjs(to).format('D MMMM YYYY')}`}
        </Text>
      ) : (
        <Text variant="captionRegular" color={color} style={styles.ml10}>
          {from && `с ${dayjs(from).format('D MMMM YYYY')} `}
          {to && `по ${dayjs(to).format('D MMMM YYYY')}`}
        </Text>
      )}
    </View>
  );
};
