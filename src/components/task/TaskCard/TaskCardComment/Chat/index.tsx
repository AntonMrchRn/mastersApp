import React, { memo } from 'react';
import { View } from 'react-native';

import dayjs from 'dayjs';
import { Text, useTheme } from 'rn-ui-kit';

import 'dayjs/locale/ru';

import styles from './style';

type ChatItemProps = {
  message: {
    isMine?: boolean;
    comment?: string;
    creationTime?: string;
    fullname: string;
    ID: number;
  };
  isITServices: boolean;
};

const ChatMessage = ({
  message: { isMine, comment, creationTime, fullname },
  isITServices,
}: ChatItemProps) => {
  const theme = useTheme();
  const time = dayjs(creationTime).locale('ru').format('D MMMM, HH:mm');

  return (
    <>
      <View style={[isMine ? styles.container : styles.containerHuman]}>
        {/*// TODO add author type when the BE is ready */}
        {isITServices && !isMine && (
          <Text
            numberOfLines={1}
            style={[styles.humanInfo, { color: theme.text.neutral }]}
            variant="captionRegular"
          >
            {fullname}
          </Text>
        )}
        <View
          style={
            isMine
              ? [
                  styles.wrapperMessageMy,
                  { backgroundColor: theme.background.neutralDisableSecond },
                ]
              : [
                  styles.wrapperMessageHuman,
                  { backgroundColor: theme.background.accentMessage },
                ]
          }
        >
          <Text variant="bodySRegular">{comment}</Text>
        </View>
        <Text
          variant="tabBarLabel"
          style={[
            isMine ? styles.timeMy : styles.timeHuman,
            { color: theme.text.neutral },
          ]}
        >
          {time}
        </Text>
      </View>
    </>
  );
};

export default memo(ChatMessage);
