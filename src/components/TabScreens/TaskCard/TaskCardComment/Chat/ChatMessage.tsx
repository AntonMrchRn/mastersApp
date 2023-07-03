import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import dayjs from 'dayjs';

import 'dayjs/locale/ru';

interface iChatItem {
  item: {
    isMine: string;
    messageDate: string;
    text: string;
  };
}

const ChatMessage = () => {
  return (
    // <View style={isMine ? styles.container : styles.containerHuman}>
    //   <View
    //     style={isMine ? styles.wrapperMessageMy : styles.wrapperMessageHuman}
    //   >
    //     <Text style={isMine ? styles.textMy : styles.textHuman}>{text}</Text>
    //   </View>
    //   <Text style={isMine ? styles.timeMy : styles.timeHuman}>{time}</Text>
    // </View>
    <View style={styles.container}>
      <Text>123</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    height: 200,
  },
  containerHuman: {
    alignItems: 'flex-start',
  },
  wrapperMessageMy: {
    backgroundColor: 'red',
    maxWidth: '90%',
    marginLeft: 5,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginRight: 5,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperMessageHuman: {
    backgroundColor: '#d9d7d7',
    maxWidth: '90%',
    marginLeft: 5,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginRight: 5,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textMy: {
    lineHeight: 18,
    color: '#f0f0f0',
    fontSize: 14,
    fontWeight: '500',
  },
  textHuman: {
    lineHeight: 18,
    color: '#000',
    fontSize: 14,
    fontWeight: '400',
  },
  timeMy: {
    fontSize: 12,
    marginRight: 10,
    marginTop: 4,
    marginBottom: 16,
    color: '#000',
  },
  timeHuman: {
    fontSize: 12,
    marginLeft: 10,
    marginTop: 3,
    marginBottom: 16,
    color: '#000',
  },
});

export default ChatMessage;
