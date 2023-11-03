import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';

import messaging from '@react-native-firebase/messaging';

import { configApp } from '@/constants/platform';

const iosPushPermission = async () => {
  const hasPermission = await messaging().hasPermission();
  if (hasPermission !== messaging.AuthorizationStatus.DENIED) {
    const authorizationStatus = await messaging().requestPermission();
    return authorizationStatus;
  }
  return hasPermission;
};

const androidPushPermission = async () => {
  const hasPermission = await check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
  if (hasPermission !== RESULTS.GRANTED) {
    const authorizationStatus = await request(
      PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
    );
    return authorizationStatus;
  }
  return hasPermission;
};

export const pushPermission = configApp.ios
  ? iosPushPermission
  : androidPushPermission;
