import React, { FC, useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useTheme } from 'rn-ui-kit';

import { CommentIcon } from '@/assets/icons/svg/screens/CommentIcon';
import { StatusType } from '@/types/task';
import { configApp } from '@/constants/platform';
import ChatMessage from './Chat/ChatMessage';

type TaskCardCommentProps = {
  taskId: string;
  statusID?: number;
};

export const TaskCardComment: FC<TaskCardCommentProps> = ({
  taskId,
  statusID,
}) => {
  const theme = useTheme();
  const [keyboardOffset, setKeyboardOffset] = useState(0);

  const onKeyboardShow = event =>
    setKeyboardOffset(event.endCoordinates.height);
  const onKeyboardHide = () => setKeyboardOffset(0);
  const keyboardDidShowListener = useRef();
  const keyboardDidHideListener = useRef();

  useEffect(() => {
    keyboardDidShowListener.current = Keyboard.addListener(
      'keyboardWillShow',
      onKeyboardShow
    );
    keyboardDidHideListener.current = Keyboard.addListener(
      'keyboardWillHide',
      onKeyboardHide
    );

    return () => {
      keyboardDidShowListener.current.remove();
      keyboardDidHideListener.current.remove();
    };
  }, [keyboardOffset]);

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
    wrapperList: {
      padding: 10,
    },
  });

  const renderStatus = () => {
    switch (statusID) {
      case StatusType.CLOSED:
        return (
          <View style={{ alignItems: 'center' }}>
            <CommentIcon />
            <Text style={styles.title}>Комментарии пока закрыты</Text>
            <Text>
              Отправка сообщений будет доступна в случае назначения вас в
              качестве исполнителя
            </Text>
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

  const renderItem = ({ item }) => {
    return (
      <>
        <ChatMessage data={item} />
      </>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {/* {renderStatus()} */}
      <View
        style={{
          flex: 1,
          marginBottom: configApp.ios ? 10 : 0,
          backgroundColor: 'green',
        }}
      ></View>
      <View
        style={{
          paddingBottom: configApp.android
            ? keyboardOffset
            : keyboardOffset - 30,
        }}
      >
        <View style={{ height: 50, backgroundColor: 'red' }} />
      </View>
    </View>
  );
};
