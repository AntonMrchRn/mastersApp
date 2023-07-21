import React, { FC, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { Text, useTheme } from 'rn-ui-kit';

import { useAppDispatch, useAppSelector } from '@/store';
import { getCommentsPreview } from '@/store/slices/myTasks/asyncActions';
import { clearCommentsPreview } from '@/store/slices/myTasks/reducer';

import PreviewNotFound from '../../../tabs/TaskSearch/PreviewNotFound';
import ChatMessage from './Chat/ChatMessage';

import { styles } from './styles';

type TaskCardCommentProps = {
  taskId: string;
  statusID?: number;
};

export const TaskCardComment: FC<TaskCardCommentProps> = ({ taskId }) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const { commentsPreview, loadingCommentsPreview } = useAppSelector(
    state => state.myTasks
  );

  useEffect(() => {
    dispatch(
      getCommentsPreview({ idCard: taskId, numberOfPosts: 5, sort: 'asc' })
    );
    return () => {
      dispatch(clearCommentsPreview());
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text variant="title3">Последние сообщения</Text>
      <View style={styles.containerList}>
        {commentsPreview?.taskComment?.length ? (
          commentsPreview?.taskComment.map(item => {
            return <ChatMessage item={item} key={item.ID} />;
          })
        ) : !loadingCommentsPreview ? (
          <PreviewNotFound type={4} />
        ) : (
          <View style={styles.wrapperLoader}>
            <ActivityIndicator color={theme.background.accent} size={'large'} />
          </View>
        )}
      </View>
    </View>
  );
};
