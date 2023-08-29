import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  FlatList,
  ListRenderItemInfo,
  TouchableOpacity,
  View,
} from 'react-native';
import { useKeyboardAnimation } from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';
import EventSource, { EventSourceListener } from 'react-native-sse';

import { StackScreenProps } from '@react-navigation/stack';
import { Input, useTheme } from 'rn-ui-kit';

import SendButton from '@/assets/icons/svg/screens/SendButton';
import PreviewNotFound, {
  PreviewNotFoundType,
} from '@/components/tabs/TaskSearch/PreviewNotFound';
import ChatMessage from '@/components/task/TaskCard/TaskCardComment/Chat';
import { configApp } from '@/constants/platform';
import { storageMMKV } from '@/mmkv/storage';
import { AppScreenName, AppStackParamList } from '@/navigation/AppNavigation';
import { axiosInstance } from '@/services/axios/axiosInstance';
import { useAppDispatch, useAppSelector } from '@/store';
import { getComments, sendMessage } from '@/store/slices/myTasks/asyncActions';
import { clearComments } from '@/store/slices/myTasks/reducer';
import { Comment } from '@/store/slices/myTasks/types';
import { TaskSearch } from '@/types/task';

import { styles } from './style';

type CommentsChatScreenProps = StackScreenProps<
  AppStackParamList,
  AppScreenName.CommentsChat
>;
let sse: EventSource<never>;
export const CommentsChatScreen = ({
  route: {
    params: { taskId, recipientIDs, isITServices, isMessageInputAvailable },
  },
}: CommentsChatScreenProps) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { height } = useKeyboardAnimation();

  const flatList = useRef<FlatList>(null);

  const [isActive, setIsActive] = useState(false);
  const [valueText, setValueText] = useState('');

  const { comments, loadingComments, loadingSend } = useAppSelector(
    state => state.myTasks
  );

  useEffect(() => {
    dispatch(getComments({ idCard: taskId, numberOfPosts: 30, sort: 'desc' }));
    const timeout = setInterval(
      () =>
        dispatch(
          getComments({ idCard: taskId, numberOfPosts: 999, sort: 'desc' })
        ),
      4000
    );
    return () => {
      dispatch(clearComments());
      clearInterval(timeout);
    };
  }, []);
  const token = storageMMKV.getString('token');
  useEffect(() => {
    (async () => {
      const res = await axiosInstance.get(
        `https://sandbox8.apteka-aprel.ru/api/postman/subscribe?taskID=${taskId}`
      );
      const ress = new EventSource(res.data, {
        headers: { ['M-Token']: token },
      });
      sse = ress;
      const listener: EventSourceListener = event => {
        if (event.type === 'open') {
          console.log('Open SSE connection.');
        } else if (event.type === 'message') {
          const res = JSON.parse(event.data || '');
          console.log('🚀 ~ file: index.tsx:77 ~ useEffect ~ res:', res);
        } else if (event.type === 'error') {
          console.error('Connection error:', event.message);
        } else if (event.type === 'exception') {
          console.error('Error:', event.message, event.error);
        }
      };
      sse.addEventListener('open', listener);
      sse.addEventListener('message', listener);
      sse.addEventListener('error', listener);
    })();

    return () => {
      sse.removeAllEventListeners();
      sse.close();
    };
  }, []);

  useEffect(() => {
    if (isActive) {
      flatList?.current?.scrollToIndex({ index: 0 });
    }
  }, [isActive]);

  const renderItem = ({ item: message }: ListRenderItemInfo<Comment>) => (
    <ChatMessage message={message} isITServices={isITServices} />
  );

  const keyExtractor = (item: TaskSearch) => `${item.ID}`;

  const onPressSend = async () => {
    if (valueText.trim()) {
      try {
        await dispatch(
          sendMessage({ taskId, comment: valueText, recipientIDs })
        );
        setValueText('');
      } catch (e) {
        console.log('onPressSend error: ', e);
      }
    }
  };

  const onChangeText = (text: string) => {
    if (!loadingSend) {
      setValueText(text);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Animated.View
        style={[
          styles.containerChat,
          {
            transform: [{ translateY: height }],
          },
        ]}
      >
        {comments?.taskComment?.length ? (
          <FlatList
            inverted
            ref={flatList}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            data={comments?.taskComment}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.wrapperChat}
          />
        ) : !loadingComments || comments?.taskComment ? (
          <PreviewNotFound type={PreviewNotFoundType.NoMessagesYet} />
        ) : (
          !comments?.taskComment && (
            <View style={styles.wrapperLoader}>
              <ActivityIndicator
                color={theme.background.accent}
                size={'large'}
              />
            </View>
          )
        )}
      </Animated.View>
      {isMessageInputAvailable && (
        <Animated.View
          style={[
            styles.risingBlock,
            {
              transform: [{ translateY: height }],
              bottom: configApp.ios && isActive ? -20 : 0,
            },
          ]}
        >
          <Input
            value={!loadingSend ? valueText : ''}
            onChangeText={onChangeText}
            variant="message"
            placeholder="Сообщение..."
            ref={ref => ref && setIsActive(ref?.isFocused())}
            style={isActive ? styles.w80 : styles.w100}
          />
          {isActive && (
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: theme.background.accent }]}
              onPress={onPressSend}
            >
              <SendButton />
            </TouchableOpacity>
          )}
        </Animated.View>
      )}
    </SafeAreaView>
  );
};
