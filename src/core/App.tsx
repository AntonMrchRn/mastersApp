import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { LinkingOptions, NavigationContainer } from '@react-navigation/native';
import dayjs from 'dayjs';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider, ToastProvider } from 'rn-ui-kit';

import { MyTheme } from '@/constants/platform';
import { AppNavigation, AppStackParamList } from '@/navigation/AppNavigation';
import { persistor, store } from '@/store';

import 'dayjs/locale/ru';

dayjs.locale('ru');

const App = () => {
  const config = {
    screens: {
      TaskCard: {
        path: 'TaskCard/:taskId',
      },
      AppNavigator: {
        screens: {
          TaskSearch: {
            path: 'TaskSearch',
          },
          ProfileNavigation: {
            screens: {
              Profile: 'Profile',
            },
          },
        },
      },
    },
  };
  const linking: LinkingOptions<AppStackParamList> = {
    prefixes: ['mastera://', 'https://mastera-service.ru'],
    config,
  };
  return (
    <GestureHandlerRootView style={styles.container}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaProvider>
            <ThemeProvider>
              <ToastProvider>
                <KeyboardProvider>
                  <NavigationContainer theme={MyTheme} linking={linking}>
                    <BottomSheetModalProvider>
                      <StatusBar
                        translucent
                        barStyle={'dark-content'}
                        backgroundColor={'#FFFFFF'}
                      />
                      <AppNavigation />
                    </BottomSheetModalProvider>
                  </NavigationContainer>
                </KeyboardProvider>
              </ToastProvider>
            </ThemeProvider>
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
