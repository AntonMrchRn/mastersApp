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
      marginLeft: 10,
    },
    date: {
      marginTop: 8,
      flexDirection: 'row',
    },
  });

  return (
    <View style={styles.date}>
      <CalendarCheckIcon />
      <Text variant="bodySRegular" color={theme.text.basic} style={styles.ml10}>
        с {dayjs(from).format('DD MMMM YYYY')} по{' '}
        {dayjs(to).format('DD MMMM YYYY')}
      </Text>
    </View>
  );
};
