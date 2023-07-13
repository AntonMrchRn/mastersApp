import React, { FC, useEffect, useState } from 'react';
import { Animated, FlatList, KeyboardAvoidingView, View } from 'react-native';
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

  const { comments } = useAppSelector(state => state.myTasks);
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    dispatch(getComments({ idCard: taskId, numberOfPosts: 10, sort: 'asc' }));
  }, []);

  const renderItem = item => <ChatMessage {...item} />;

  const { height } = useKeyboardAnimation();

  useEffect(() => {
    console.log('isActive', isActive);
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
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
