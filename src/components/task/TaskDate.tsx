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
      marginLeft: 7,
    },
    date: {
      marginTop: 8,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'red',
    },
    wrapperIcon: { width: 20, bottom: 2 },
  });

  return (
    <View style={styles.date}>
      <View style={styles.wrapperIcon}>
        <CalendarCheckIcon />
      </View>
      <Text
        variant="captionRegular"
        color={theme.text.basic}
        style={styles.ml10}
      >
        {from && `с ${dayjs(from).format('DD MMMM YYYY')} `}
        {to && `по ${dayjs(to).format('DD MMMM YYYY')}`}
      </Text>
    </View>
  );
};
