import messaging from '@react-native-firebase/messaging';

export const getBackgroundMessages = () => {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });
};
