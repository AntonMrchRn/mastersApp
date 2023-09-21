import messaging from '@react-native-firebase/messaging';

export const iosPushPermission = async () => {
  const authorizationStatus = await messaging().requestPermission();
  if (authorizationStatus) {
    console.log('Permission status:', authorizationStatus);
  }
};
