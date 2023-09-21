import messaging from '@react-native-firebase/messaging';

export const iosPushPermission = async () => {
  const hasPermission = await messaging().hasPermission();
  if (hasPermission !== messaging.AuthorizationStatus.DENIED) {
    const authorizationStatus = await messaging().requestPermission();
    return authorizationStatus;
  }
  return hasPermission;
};
