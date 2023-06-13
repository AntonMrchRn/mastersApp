import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import dayjs from 'dayjs';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider, ToastProvider } from 'rn-ui-kit';

import { MyTheme } from '@/constants/platform';
import RootNavigation from '@/navigation/rootNavigation';
import { persistor, store } from '@/store';

import 'dayjs/locale/ru';

dayjs.locale('ru');
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <ThemeProvider>
            <ToastProvider>
              <NavigationContainer theme={MyTheme}>
                <RootNavigation />
              </NavigationContainer>
            </ToastProvider>
          </ThemeProvider>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
