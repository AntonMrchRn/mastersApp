import React, { FC } from 'react';
import { View } from 'react-native';

import { Text, useTheme } from 'rn-ui-kit';

import { OtesIcon } from '@/assets/icons/svg/screens/OtesIcon';
import { TaskCardStatus } from '@/screens/tabs/TaskCardScreen/useTaskCard';

import { useTaskReport } from './useTaskReport';

import { styles } from './styles';

type TaskCardReportProps = {
  activeBudgetCanceled: boolean;
  statusCode: TaskCardStatus;
};
export const TaskCardReport: FC<TaskCardReportProps> = ({
  activeBudgetCanceled,
  statusCode,
}) => {
  const {} = useTaskReport();
  const theme = useTheme();
  const getContent = () => {
    switch (statusCode) {
      case 'active':
        return (
          <View style={styles.container}>
            <View
              style={[
                styles.otes,
                { backgroundColor: theme.background.fieldMain },
              ]}
            >
              <OtesIcon />
            </View>
            <Text
              variant="title2"
              style={styles.title}
              color={theme.text.basic}
            >
              {activeBudgetCanceled
                ? 'Отчет  недоступен'
                : 'Отчет пока недоступен'}
            </Text>
            <Text
              variant="bodySRegular"
              style={styles.description}
              color={theme.text.neutral}
            >
              {activeBudgetCanceled
                ? 'Отправка файлов доступна только назначенным исполнителям'
                : 'Вы сможете отправлять файлы для подтверждения выполненных услуг в случае назначения вас исполнителем'}
            </Text>
          </View>
        );
      default:
        return <></>;
    }
  };
  return <>{getContent()}</>;
};
