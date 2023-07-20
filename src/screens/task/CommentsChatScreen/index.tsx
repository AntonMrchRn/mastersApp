import React, { FC, useEffect, useRef, useState } from 'react';
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
import ChatMessage from '@/components/task/TaskCard/TaskCardComment/Chat/ChatMessage';
import PreviewNotFound from '@/components/TabScreens/TaskSearch/PreviewNotFound';
import { configApp } from '@/constants/platform';
import { AppScreenName, AppStackParamList } from '@/navigation/AppNavigation';
import { useAppDispatch, useAppSelector } from '@/store';
import { getComments } from '@/store/slices/myTasks/asyncActions';
import { clearComments } from '@/store/slices/myTasks/reducer';
import { Comment } from '@/store/slices/myTasks/types';
import { TaskSearch } from '@/types/task';

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
  const flatList = useRef<FlatList>(null);
  const [isActive, setIsActive] = useState(false);

  const { comments, loadingComments } = useAppSelector(state => state.myTasks);

  useEffect(() => {
    dispatch(getComments({ idCard: taskId, numberOfPosts: 30, sort: 'desc' }));
    return () => {
      dispatch(clearComments());
    };
  }, []);

  useEffect(() => {
    if (isActive) {
      flatList?.current?.scrollToIndex({ index: 0 });
    }
  }, [isActive]);

  const renderItem = ({ item }: ListRenderItemInfo<Comment>) => (
    <ChatMessage item={item} />
  );

  const keyExtractor = (item: TaskSearch) => `${item.ID}`;

  const { height } = useKeyboardAnimation();

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
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            contentContainerStyle={styles.wrapperChat}
            data={comments?.taskComment}
          />
        ) : !loadingComments ? (
          <PreviewNotFound type={4} />
        ) : (
          <View style={styles.wrapperLoader}>
            <ActivityIndicator color={theme.background.accent} size={'large'} />
          </View>
        )}
      </Animated.View>
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
          variant="message"
          placeholder="Сообщение..."
          ref={ref => ref && setIsActive(ref?.isFocused())}
          style={isActive ? styles.w80 : styles.w100}
        />
        {isActive && (
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: theme.background.accent }]}
          >
            <SendButton />
          </TouchableOpacity>
        )}
      </Animated.View>
    </SafeAreaView>
  );
};
