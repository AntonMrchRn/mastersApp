import React, { FC } from 'react';
import { ActivityIndicator, View } from 'react-native';

import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import { Text, useTheme } from 'rn-ui-kit';

import { NoHistoryIcon } from '@/assets/icons/svg/screens/NoHistoryIcon';
import PreviewNotFound, {
  PreviewNotFoundType,
} from '@/components/tabs/TaskSearch/PreviewNotFound';
import { useGetTaskHistoryQuery } from '@/store/api/tasks';
import { StatusType } from '@/types/task';

import { ContentHistory } from './ContentHistory';

import { styles } from './styles';

dayjs.extend(updateLocale);

type TaskCardHistoryProps = {
  taskId: number;
  statusID?: number;
};

export const TaskCardHistory: FC<TaskCardHistoryProps> = ({
  taskId,
  statusID,
}) => {
  const theme = useTheme();

  const { data: history } = useGetTaskHistoryQuery(taskId);

  const NotFoundHistory = (
    <View style={styles.otes}>
      <View style={styles.wrapperIconHistory}>
        <NoHistoryIcon />
      </View>
      <Text variant="bodySRegular" style={styles.desc} color={theme.text.basic}>
        Здесь будет отображаться ход событий задачи
      </Text>
    </View>
  );

  const getContent = () => {
    return statusID === StatusType.ACTIVE ? (
      <PreviewNotFound type={PreviewNotFoundType.NoHistoryEvents} />
    ) : (
      <View>
        <Text variant="title3" style={styles.txt} color={theme.text.basic}>
          События задачи
        </Text>
        {history?.isLoading ? (
          <View style={styles.wrapperLoading}>
            <ActivityIndicator size={'large'} color={theme.background.accent} />
          </View>
        ) : history?.taskComment ? (
          <ContentHistory history={history} />
        ) : (
          NotFoundHistory
        )}
      </View>
    );
  };

  return <>{getContent()}</>;
};
