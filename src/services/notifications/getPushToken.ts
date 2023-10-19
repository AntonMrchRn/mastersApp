import messaging from '@react-native-firebase/messaging';
export const getPushToken = async () => {
  const token = await messaging().getToken();
  return token;
};
