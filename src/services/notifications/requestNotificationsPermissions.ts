import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';

import messaging from '@react-native-firebase/messaging';

import { configApp } from '@/constants/platform';

export const requestNotificationsIOSPermissions = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled = [
    messaging.AuthorizationStatus.AUTHORIZED,
    messaging.AuthorizationStatus.PROVISIONAL,
  ].includes(authStatus);
  return enabled;
};

export const requestNotificationsAndroidPermissions = async () => {
  const checkRes = await check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
  if (checkRes === RESULTS.GRANTED) {
    return true;
  }
  const res = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
  if (res === RESULTS.GRANTED) {
    return true;
  }
  return false;
};

export const requestNotificationsPermissions = configApp.ios
  ? requestNotificationsIOSPermissions
  : requestNotificationsAndroidPermissions;
