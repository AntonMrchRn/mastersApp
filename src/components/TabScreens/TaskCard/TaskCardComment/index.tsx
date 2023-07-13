import React, { FC, useEffect } from 'react';
import { View } from 'react-native';

import { Text } from 'rn-ui-kit';

import { useAppDispatch, useAppSelector } from '@/store';
import { getComments } from '@/store/slices/myTasks/asyncActions';
import { clearComments } from '@/store/slices/myTasks/reducer';

import PreviewNotFound from '../../TaskSearch/PreviewNotFound';
import ChatMessage from './Chat/ChatMessage';

type TaskCardCommentProps = {
  taskId: string;
  statusID?: number;
};

export const TaskCardComment: FC<TaskCardCommentProps> = ({
  taskId,
  statusID,
}) => {
  const dispatch = useAppDispatch();
  const { comments } = useAppSelector(state => state.myTasks);

  useEffect(() => {
    dispatch(getComments({ idCard: taskId, numberOfPosts: 5, sort: 'desc' }));
    return () => {
      dispatch(clearComments());
    };
  }, []);

  return (
    <View style={{ flex: 1, paddingTop: 25 }}>
      <Text variant="title3">Последние сообщения</Text>
      <View
        style={{
          flex: 1,
          paddingTop: 10,
          justifyContent: 'flex-end',
          bottom: -20,
        }}
      >
        {comments?.taskComment?.length ? (
          comments?.taskComment.map(item => {
            return <ChatMessage item={item} key={item.ID} />;
          })
        ) : (
          <PreviewNotFound type={4} />
        )}
      </View>
    </View>
  );
};
