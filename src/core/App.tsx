import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaProvider>
            <ThemeProvider>
              <ToastProvider>
                <NavigationContainer theme={MyTheme}>
                  <BottomSheetModalProvider>
                    <RootNavigation />
                  </BottomSheetModalProvider>
                </NavigationContainer>
              </ToastProvider>
            </ThemeProvider>
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
