import messaging from '@react-native-firebase/messaging';
export const getPushToken = async () => {
  await messaging().registerDeviceForRemoteMessages();
  const token = await messaging().getToken();
  console.log('🚀 ~ file: getToken.ts:5 ~ getToken ~ token:', token);
};
