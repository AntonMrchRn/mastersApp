import React from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';

import { DownloadManager } from '@/components/DownloadManager';
import { MyTheme } from '@/constants/platform';
import { store } from '@/store';

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
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer theme={MyTheme}>
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <DownloadManager files={files} />
          </View>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
