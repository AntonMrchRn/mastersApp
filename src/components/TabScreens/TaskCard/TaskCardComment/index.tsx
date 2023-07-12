import React, { FC, useEffect } from 'react';
import { StyleSheet, Text as RNText, View } from 'react-native';

import { Text, useTheme } from 'rn-ui-kit';

import { CommentIcon } from '@/assets/icons/svg/screens/CommentIcon';
import { useAppDispatch } from '@/store';
import { getComments } from '@/store/slices/myTasks/asyncActions';
import { StatusType } from '@/types/task';

type TaskCardCommentProps = {
  taskId: string;
  statusID?: number;
};

export const TaskCardComment: FC<TaskCardCommentProps> = ({
  taskId,
  statusID,
}) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const styles = StyleSheet.create({
    title: {
      fontFamily: 'Nunito Sans Bold',
      fontWeight: '700',
      fontSize: 22,
      color: theme.text.basic,
    },
    description: {
      fontFamily: 'Nunito Sans Regular',
      fontWeight: '400',
      fontSize: 15,
      color: theme.text.neutral,
    },
  });

  useEffect(() => {
    dispatch(getComments({ idCard: taskId }));
  }, []);

  const renderStatus = () => {
    switch (statusID) {
      case StatusType.CLOSED:
        return (
          <View style={{ alignItems: 'center' }}>
            <CommentIcon />
            <RNText style={styles.title}>Комментарии пока закрыты</RNText>
            <RNText>
              Отправка сообщений будет доступна в случае назначения вас в
              качестве исполнителя
            </RNText>
          </View>
        );
      case StatusType.ACTIVE:
        return (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              gap: 7,
            }}
          >
            <CommentIcon />
            <Text style={styles.title}>Комментарии пока закрыты</Text>
            <Text>
              Отправка сообщений будет доступна в случае назначения вас в
              качестве исполнителя
            </Text>
          </View>
        );
      default:
        return <></>;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
      {/* {renderStatus()} */}
      <View>
        <Text variant="title3">Последние сообщения</Text>
      </View>
    </View>
  );
};
