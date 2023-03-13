import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { MyTheme } from '../utils/helpers/platform';
import RootNavigate from '../navigation/rootNavigation';
import { store } from '../redux';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer theme={MyTheme}>
        <RootNavigate />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
