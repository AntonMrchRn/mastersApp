import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';

import { DownloadManager } from '@/components/DownloadManager';
import { MyTheme } from '@/constants/platform';
import RootNavigation from '@/navigation/rootNavigation';
import { store } from '@/store';
import { View } from 'react-native';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer theme={MyTheme}>
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <DownloadManager title={'123'} metric={'Mb'} size={30} />
          </View>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
