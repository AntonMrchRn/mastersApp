import React, { FC } from 'react';
import { View } from 'react-native';

import { Text, useTheme } from 'rn-ui-kit';

import { OtesIcon } from '@/assets/icons/svg/screens/OtesIcon';

import { styles } from './styles';

type TaskCardReportProps = {};
export const TaskCardReport: FC<TaskCardReportProps> = ({}) => {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <View
        style={[styles.otes, { backgroundColor: theme.background.fieldMain }]}
      >
        <OtesIcon />
      </View>
      <Text variant="title2" style={styles.title} color={theme.text.basic}>
        Отчет пока недоступен
      </Text>
      <Text
        variant="bodySRegular"
        style={styles.description}
        color={theme.text.neutral}
      >
        Вы сможете отправлять файлы для подтверждения выполненных услуг в случае
        назначения вас исполнителем
      </Text>
    </View>
  );
};
