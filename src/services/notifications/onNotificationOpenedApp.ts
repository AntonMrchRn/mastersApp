import { Linking } from 'react-native';

import { firebase } from '@react-native-firebase/messaging';

export const onNotificationOpenedApp = () => {
  firebase.messaging().onNotificationOpenedApp(async remoteMessage => {
    if (remoteMessage) {
      const data = remoteMessage?.data as { type: string };
      if (data?.type) {
        const canOpenURL = await Linking.canOpenURL(data?.type);
        if (canOpenURL) {
          Linking.openURL(data?.type);
        }
      }
    }
  });
};
