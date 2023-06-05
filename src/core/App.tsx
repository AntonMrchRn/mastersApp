import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider, ToastProvider } from 'rn-ui-kit';

import { MyTheme } from '@/constants/platform';
import RootNavigation from '@/navigation/rootNavigation';
import { store } from '@/store';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <ThemeProvider>
          <ToastProvider>
            <NavigationContainer theme={MyTheme}>
              <RootNavigation />
            </NavigationContainer>
          </ToastProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
