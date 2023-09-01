import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import dayjs from 'dayjs';
import { Text, useTheme } from 'rn-ui-kit';

import { CalendarCheckIcon } from '@/assets/icons/svg/screens/CalendarCheckIcon';

type TaskDateProps = {
  from: string;
  to: string;
};
export const TaskDate: FC<TaskDateProps> = ({ from, to }) => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    ml10: {
      marginLeft: 5,
    },
    date: {
      marginTop: 8,
      flexDirection: 'row',
      alignItems: 'center',
    },
    wrapperIcon: { width: 20, bottom: 2.7 },
  });

  const inOneMonth = !!(
    from &&
    to &&
    dayjs(from).year() === dayjs(to).year() &&
    dayjs(from).month() === dayjs(to).month()
  );

  return (
    <View style={styles.date}>
      <View style={styles.wrapperIcon}>
        <CalendarCheckIcon />
      </View>
      {inOneMonth ? (
        <Text
          variant="captionRegular"
          color={theme.text.neutral}
          style={styles.ml10}
        >
          {`${dayjs(from).format('D')}`}-{`${dayjs(to).format('D MMMM YYYY')}`}
        </Text>
      ) : (
        <Text
          variant="captionRegular"
          color={theme.text.neutral}
          style={styles.ml10}
        >
          {from && `с ${dayjs(from).format('D MMMM YYYY')} `}
          {to && `по ${dayjs(to).format('D MMMM YYYY')}`}
        </Text>
      )}
    </View>
  );
};
