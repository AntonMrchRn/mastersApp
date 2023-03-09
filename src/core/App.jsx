import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { MyTheme } from '../helpers/platform';
import RootNavigate from '../navigation/rootNavigation';

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
