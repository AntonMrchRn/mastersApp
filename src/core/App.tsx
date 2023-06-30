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
import { AppNavigation } from '@/navigation/AppNavigation';
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
                    <AppNavigation />
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
