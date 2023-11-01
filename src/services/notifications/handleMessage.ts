import { Linking } from 'react-native';

import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';

export const handleMessage = async (
  notification: FirebaseMessagingTypes.RemoteMessage | null,
) => {
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
