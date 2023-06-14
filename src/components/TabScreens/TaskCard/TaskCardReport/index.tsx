import React, { FC } from 'react';
import { View } from 'react-native';

import { Text, useTheme } from 'rn-ui-kit';

import { DownloadFilesIcon } from '@/assets/icons/svg/screens/DownloadFilesIcon';
import { NoFilesIcon } from '@/assets/icons/svg/screens/NoFilesIcon';
import { OtesIcon } from '@/assets/icons/svg/screens/OtesIcon';
import { StatusType } from '@/types/task';

import { styles } from './styles';

type TaskCardReportProps = {
  activeBudgetCanceled: boolean;
  statusID: StatusType | undefined;
};
export const TaskCardReport: FC<TaskCardReportProps> = ({
  activeBudgetCanceled,
  statusID,
}) => {
  const theme = useTheme();
  const getContent = () => {
    switch (statusID) {
      case StatusType.ACTIVE:
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
      case StatusType.SIGNING:
        return (
          <View style={styles.mt36}>
            <Text variant="title3" color={theme.text.basic}>
              Загруженные файлы
            </Text>
            <View style={styles.download}>
              <DownloadFilesIcon />
              <Text
                variant="bodySRegular"
                style={styles.desc}
                color={theme.text.neutral}
              >
                Загрузите файлы, подтверждающие выполнение услуг общим размером
                не более 50 МВ
              </Text>
            </View>
          </View>
        );
      default:
        return (
          <View style={styles.container}>
            <View
              style={[
                styles.otes,
                { backgroundColor: theme.background.fieldMain },
              ]}
            >
              <NoFilesIcon />
            </View>
            <Text
              variant="title2"
              style={styles.title}
              color={theme.text.basic}
            >
              Файлов нет
            </Text>
          </View>
        );
    }
  };
  return <>{getContent()}</>;
};
