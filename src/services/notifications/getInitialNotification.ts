import { firebase } from '@react-native-firebase/messaging';

import { handleMessage } from './handleMessage';

export const getInitialNotification = async () => {
  const notification = await firebase.messaging().getInitialNotification();
  await handleMessage(notification);
};
