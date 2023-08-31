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

import { StackScreenProps } from '@react-navigation/stack';
import { Input, useTheme } from 'rn-ui-kit';

import SendButton from '@/assets/icons/svg/screens/SendButton';
import PreviewNotFound, {
  PreviewNotFoundType,
} from '@/components/tabs/TaskSearch/PreviewNotFound';
import ChatMessage from '@/components/task/TaskCard/TaskCardComment/Chat';
import { configApp } from '@/constants/platform';
import { useCommentsSSE } from '@/hooks/useCommentsSSE';
import { AppScreenName, AppStackParamList } from '@/navigation/AppNavigation';
import { useAppDispatch, useAppSelector } from '@/store';
import { sendMessage } from '@/store/slices/myTasks/asyncActions';
import { Comment } from '@/store/slices/myTasks/types';
import { TaskSearch } from '@/types/task';

import { styles } from './style';

type CommentsChatScreenProps = StackScreenProps<
  AppStackParamList,
  AppScreenName.CommentsChat
>;

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
  console.log('🚀 ~ file: index.tsx:51 ~ comments:', comments);

  useCommentsSSE(taskId.toString());

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
