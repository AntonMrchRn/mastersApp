import React, { FC, memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import dayjs from 'dayjs';
import { useTheme } from 'rn-ui-kit';

import { fonts } from '@/constants/fonts';

import 'dayjs/locale/ru';

type ChatItemProps = {
  item: {
    isMine?: boolean;
    comment?: string;
    creationTime?: string;
    ID?: number;
  };
};

const ChatMessage: FC<ChatItemProps> = ({
  item: { isMine, comment, creationTime, ID },
}) => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
      alignItems: 'flex-end',
    },
    containerHuman: {
      alignItems: 'flex-start',
    },
    wrapperMessageMy: {
      backgroundColor: '#f1f1f1',
      maxWidth: '90%',
      marginLeft: 5,
      paddingVertical: 10,
      paddingHorizontal: 12,
      marginRight: 5,
      borderRadius: 10,
      borderTopRightRadius: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    wrapperMessageHuman: {
      backgroundColor: theme.background.accentMessage,
      maxWidth: '90%',
      marginLeft: 5,
      paddingVertical: 10,
      paddingHorizontal: 12,
      marginRight: 5,
      borderRadius: 10,
      borderTopLeftRadius: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    textMy: {
      lineHeight: 18,
      color: theme.text.basic,
      fontFamily: fonts.main_400,
      fontSize: 14,
      fontWeight: '400',
    },
    textHuman: {
      lineHeight: 18,
      fontSize: 14,
      color: theme.text.basic,
      fontFamily: fonts.main_400,
      fontWeight: '400',
    },
    timeMy: {
      fontSize: 12,
      marginRight: 10,
      marginTop: 4,
      marginBottom: 16,
      color: theme.text.neutral,
      fontFamily: fonts.main_400,
    },
    timeHuman: {
      fontSize: 12,
      marginLeft: 10,
      marginTop: 3,
      marginBottom: 16,
      color: theme.text.neutral,
      fontFamily: fonts.main_400,
    },
  });

  const time = dayjs(creationTime).locale('ru').format('DD MMMM, HH:mm');

  return (
    <>
      <View style={isMine ? styles.container : styles.containerHuman}>
        <View
          style={isMine ? styles.wrapperMessageMy : styles.wrapperMessageHuman}
        >
          <Text style={isMine ? styles.textMy : styles.textHuman}>
            {comment}
          </Text>
        </View>
        <Text style={isMine ? styles.timeMy : styles.timeHuman}>{time}</Text>
      </View>
    </>
  );
};

export default memo(ChatMessage);
