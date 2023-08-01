import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { useIsFocused } from '@react-navigation/native';
import { Text, useTheme } from 'rn-ui-kit';

import { useAppDispatch, useAppSelector } from '@/store';
import { getCommentsPreview } from '@/store/slices/myTasks/asyncActions';
import { clearCommentsPreview } from '@/store/slices/myTasks/reducer';

import PreviewNotFound, {
  PreviewNotFoundType,
} from '../../../tabs/TaskSearch/PreviewNotFound';
import ChatMessage from './Chat';

import { styles } from './styles';

type TaskCardCommentProps = {
  taskId: string;
  isITServices: boolean;
  isCommentsAvailable: boolean;
};

export const TaskCardComment = ({
  taskId,
  isITServices,
  isCommentsAvailable,
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

    return <PreviewNotFound type={PreviewNotFoundType.NoMessages} />;
  };

  return (
    <View style={styles.container}>
      {isCommentsAvailable && <Text variant="title3">Последние сообщения</Text>}
      <View style={[styles.containerList]}>{renderContent()}</View>
    </View>
  );
};
