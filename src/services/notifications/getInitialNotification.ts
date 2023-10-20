import { Linking } from 'react-native';

import { firebase } from '@react-native-firebase/messaging';

export const getInitialNotification = async () => {
  const notification = await firebase.messaging().getInitialNotification();
  if (notification) {
    const data = notification?.data as { type: string };
    if (data?.type) {
      const canOpenURL = await Linking.canOpenURL(data.type);
      if (canOpenURL) {
        Linking.openURL(data?.type);
      }
    }
  }
};
