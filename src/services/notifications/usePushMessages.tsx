import { useEffect } from 'react';

import messaging from '@react-native-firebase/messaging';

export const usePushMessages = () => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log(
        '🚀 ~ file: usePushMessages.tsx:11 ~ unsubscribe ~ remoteMessage:',
        remoteMessage,
      );
    });
    return unsubscribe;
  }, []);
};
