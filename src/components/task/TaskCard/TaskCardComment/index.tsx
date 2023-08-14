import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { useIsFocused } from '@react-navigation/native';
import { Text, useTheme } from 'rn-ui-kit';

import PreviewNotFound, {
  PreviewNotFoundType,
} from '@/components/tabs/TaskSearch/PreviewNotFound';
import { useAppDispatch, useAppSelector } from '@/store';
import { getCommentsPreview } from '@/store/slices/myTasks/asyncActions';
import { clearCommentsPreview } from '@/store/slices/myTasks/reducer';

import ChatMessage from './Chat';

import { styles } from './styles';

type TaskCardCommentProps = {
  taskId: string;
  isITServices: boolean;
  isTaskClosed: boolean;
  isTaskCanceled: boolean;
  isCommentsAvailable: boolean;
  isNotAvailableForActiveType: boolean;
  isNotAvailableForFutureExecutor: boolean;
};

export const TaskCardComment = ({
  taskId,
  isITServices,
  isTaskClosed,
  isTaskCanceled,
  isCommentsAvailable,
  isNotAvailableForActiveType,
  isNotAvailableForFutureExecutor,
}: TaskCardCommentProps) => {
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();
  const theme = useTheme();

  const { commentsPreview, loadingCommentsPreview } = useAppSelector(
    state => state.myTasks
  );

  useEffect(() => {
    if (isFocused) {
      dispatch(
        getCommentsPreview({ idCard: taskId, numberOfPosts: 5, sort: 'desc' })
      );
    }

    return () => {
      dispatch(clearCommentsPreview());
    };
  }, [isFocused]);

  const renderContent = () => {
    if (isNotAvailableForFutureExecutor) {
      return (
        <PreviewNotFound type={PreviewNotFoundType.MessagesNotAvailable} />
      );
    }

    if (isNotAvailableForActiveType) {
      return <PreviewNotFound type={PreviewNotFoundType.CommentsClosedNow} />;
    }

    if (isTaskCanceled && !commentsPreview?.taskComment?.length) {
      return (
        <PreviewNotFound type={PreviewNotFoundType.NoMessagesTaskCanceled} />
      );
    }

    if (isTaskClosed && !commentsPreview?.taskComment?.length) {
      return (
        <PreviewNotFound type={PreviewNotFoundType.NoMessagesTaskClosed} />
      );
    }

    if (!isCommentsAvailable) {
      return (
        <PreviewNotFound type={PreviewNotFoundType.MessagesNotAvailable} />
      );
    }

    if (loadingCommentsPreview) {
      return (
        <View style={styles.wrapperLoader}>
          <ActivityIndicator color={theme.background.accent} size={'large'} />
        </View>
      );
    }

    if (commentsPreview?.taskComment?.length) {
      return commentsPreview?.taskComment.map(message => (
        <ChatMessage
          key={message.ID}
          message={message}
          isITServices={isITServices}
        />
      ));
    }

    return <PreviewNotFound type={PreviewNotFoundType.NoMessagesYet} />;
  };

  return (
    <View style={styles.container}>
      {isCommentsAvailable && !!commentsPreview?.taskComment?.length && (
        <Text variant="title3" style={styles.title}>
          Последние 5 сообщений
        </Text>
      )}
      <View
        style={[
          styles.containerList,
          (!isCommentsAvailable || !commentsPreview?.taskComment?.length) &&
            styles.notAvailableContainerList,
        ]}
      >
        {renderContent()}
      </View>
    </View>
  );
};
