import React, { FC } from 'react';
import { ActivityIndicator, View } from 'react-native';

import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import { Text, useTheme } from 'rn-ui-kit';

import { NoHistoryIcon } from '@/assets/icons/svg/screens/NoHistoryIcon';
import { useGetTaskHistoryQuery } from '@/store/api/tasks';

import { ContentHistory } from './ContentHistory';

import { styles } from './styles';

dayjs.extend(updateLocale);

type TaskCardHistoryProps = {
  taskId: string;
};

export const TaskCardHisory: FC<TaskCardHistoryProps> = ({ taskId }) => {
  const theme = useTheme();

  const { data: history } = useGetTaskHistoryQuery(taskId);

  const NotFoundHistory = () => {
    return (
      <View style={styles.otes}>
        <View style={styles.wrapperIconHistory}>
          <NoHistoryIcon />
        </View>
        <Text
          variant="bodySRegular"
          style={styles.desc}
          color={theme.text.basic}
        >
          Здесь будет отображаться ход событий задачи
        </Text>
      </View>
    );
  };

  const getContent = () => {
    return (
      <View style={styles.container}>
        <Text variant="title3" color={theme.text.basic}>
          События задачи
        </Text>
        {history?.isLoading ? (
          <View style={styles.wrapperLoading}>
            <ActivityIndicator size={'large'} color={theme.background.accent} />
          </View>
        ) : history?.data?.taskComment !== undefined ? (
          <ContentHistory history={history} />
        ) : (
          NotFoundHistory()
        )}
      </View>
    );
  };

  return <>{getContent()}</>;
};
