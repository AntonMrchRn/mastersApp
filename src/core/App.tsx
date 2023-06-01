import React from 'react';
import { View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import { DownloadManager } from '@/components/DownloadManager';

const App = () => {
  const files = [
    {
      url: 'https://246601.selcdn.ru/tasks-test/tasks/180/19945c8cc72150f1f1b08befd230cda5.png',
      name: 'Screenshot_7',
      fileID: 282,
      userID: 45,
      isCheck: false,
      isOffer: false,
      extension: 'png',
      isApplication: true,
    },
  ];
  SplashScreen.hide();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <DownloadManager files={files} />
    </View>
  );
};

export default App;
