import React, { FC, useEffect } from 'react';
import { View } from 'react-native';

import { Text } from 'rn-ui-kit';

import { useAppDispatch, useAppSelector } from '@/store';
import { getCommentsPreview } from '@/store/slices/myTasks/asyncActions';
import { clearCommentsPreview } from '@/store/slices/myTasks/reducer';

import PreviewNotFound from '../../TaskSearch/PreviewNotFound';
import ChatMessage from './Chat/ChatMessage';

type TaskCardCommentProps = {
  taskId: string;
  statusID?: number;
};

export const TaskCardComment: FC<TaskCardCommentProps> = ({ taskId }) => {
  const dispatch = useAppDispatch();
  const { commentsPreview } = useAppSelector(state => state.myTasks);

  useEffect(() => {
    dispatch(
      getCommentsPreview({ idCard: taskId, numberOfPosts: 5, sort: 'asc' })
    );
    return () => {
      dispatch(clearCommentsPreview());
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 36,
      }}
    >
      <Text variant="title3">Последние сообщения</Text>
      <View
        style={{
          flex: 1,
          paddingVertical: 10,
          justifyContent: 'flex-end',
          bottom: -20,
        }}
      >
        {commentsPreview?.taskComment?.length ? (
          commentsPreview?.taskComment.map(item => {
            return <ChatMessage item={item} key={item.ID} />;
          })
        ) : (
          <PreviewNotFound type={4} />
        )}
      </View>
    </View>
  );
};
