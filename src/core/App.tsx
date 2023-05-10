import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { MyTheme } from '../utils/helpers/platform';
import RootNavigate from '../navigation/rootNavigation';
import { store } from '../redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer theme={MyTheme}>
          <RootNavigate />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
