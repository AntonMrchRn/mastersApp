import React, { FC, useEffect, useRef, useState } from 'react';
import { Animated, FlatList, ListRenderItemInfo } from 'react-native';
import { useKeyboardAnimation } from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';

import { StackScreenProps } from '@react-navigation/stack';
import { Input } from 'rn-ui-kit';

import ChatMessage from '@/components/TabScreens/TaskCard/TaskCardComment/Chat/ChatMessage';
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
  const dispatch = useAppDispatch();
  const flatList = useRef<FlatList>(null);
  const { comments } = useAppSelector(state => state.myTasks);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    dispatch(getComments({ idCard: taskId, numberOfPosts: 30, sort: 'desc' }));
    return () => {
      dispatch(clearComments());
    };
  }, []);

  const renderItem = ({ item }: ListRenderItemInfo<Comment>) => (
    <ChatMessage {...item} />
  );

  const keyExtractor = (item: TaskSearch) => `${item.ID}`;

  const { height } = useKeyboardAnimation();

  useEffect(() => {
    if (isActive) {
      flatList?.current?.scrollToIndex({ index: 0 });
    }
  }, [isActive]);

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
            contentContainerStyle={{
              marginHorizontal: 20,
              justifyContent: 'center',
            }}
            data={comments?.taskComment}
          />
        ) : (
          <PreviewNotFound type={4} />
        )}
      </Animated.View>
      <Animated.View
        style={{
          transform: [{ translateY: height }],
          paddingHorizontal: 20,
          paddingBottom: configApp.android ? 10 : 0,
          bottom: configApp.ios && isActive ? -20 : 0,
        }}
      >
        <Input
          variant="message"
          placeholder="Сообщение..."
          ref={ref => ref && setIsActive(ref?.isFocused())}
        />
      </Animated.View>
    </SafeAreaView>
  );
};
