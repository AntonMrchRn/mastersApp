import React, { FC, useEffect, useRef, useState } from 'react';
import { FlatList, Keyboard, KeyboardAvoidingView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { StackScreenProps } from '@react-navigation/stack';
import { Button, Input, Text, useTheme } from 'rn-ui-kit';

import ChatMessage from '@/components/TabScreens/TaskCard/TaskCardComment/Chat/ChatMessage';
import PreviewNotFound from '@/components/TabScreens/TaskSearch/PreviewNotFound';
import { configApp } from '@/constants/platform';
import { useKeyboardHeight } from '@/hooks/useKeyboardHeight';
import { AppScreenName, AppStackParamList } from '@/navigation/AppNavigation';
import { useAppDispatch, useAppSelector } from '@/store';
import { getComments } from '@/store/slices/myTasks/asyncActions';

import { styles } from './style';

type EstimateAddMaterialScreenProps = StackScreenProps<
  AppStackParamList,
  AppScreenName.CommentsChat
>;

export const CommentsChatScreen: FC<EstimateAddMaterialScreenProps> = ({
  route: {
    params: { taskId },
  },
}) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const { comments } = useAppSelector(state => state.myTasks);
  const { keyboardOffset } = useKeyboardHeight();

  useEffect(() => {
    dispatch(getComments({ idCard: taskId, numberOfPosts: 10, sort: 'asc' }));
  }, []);

  const renderItem = item => <ChatMessage {...item} />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerChat}>
        <FlatList
          // inverted
          renderItem={renderItem}
          contentContainerStyle={{
            marginHorizontal: 20,
            justifyContent: 'center',
            flex: comments?.taskComment?.length ? 0 : 1,
          }}
          data={comments?.taskComment}
          ListEmptyComponent={<PreviewNotFound type={4} />}
        />
      </View>
      <View
        style={{
          paddingBottom: configApp.android
            ? keyboardOffset + 20
            : keyboardOffset - 20,
          marginHorizontal: 20,
        }}
      >
        <Input variant="message" placeholder="Сообщение..." />
      </View>
    </SafeAreaView>
  );
};
