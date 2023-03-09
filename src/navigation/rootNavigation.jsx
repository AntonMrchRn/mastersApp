import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import TabNavigation from './App/TabNavigation';
import AuthNavigation from './Auth';
import { useSelector } from 'react-redux';

const Stack = createStackNavigator();

const RootNavigate = () => {
  const { isAuth } = useSelector(state => state.auth);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuth ? (
        <Stack.Screen name="AppNavigation" component={TabNavigation} />
      ) : (
        <Stack.Screen name="AuthNavigation" component={AuthNavigation} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigate;
