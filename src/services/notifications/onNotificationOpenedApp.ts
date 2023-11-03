import { firebase } from '@react-native-firebase/messaging';

import { handleMessage } from './handleMessage';

export const onNotificationOpenedApp = () => {
  firebase.messaging().onNotificationOpenedApp(handleMessage);
};
