import React, { useEffect } from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import TabNavigation from './App/TabNavigation';
import AuthNavigation from './Auth';
import { useCheckLogin } from '../utils/hooks/useCheckLogin';

const Stack = createStackNavigator();

const RootNavigate = () => {
  const [checkLogin, isAuth] = useCheckLogin();

  useEffect(() => {
    checkLogin();
    // SplashScreen.hide(); TODO
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="AppNavigation"
    >
      {isAuth ? (
        <Stack.Screen name="AppNavigation" component={TabNavigation} />
      ) : (
        <Stack.Screen name="AuthNavigation" component={AuthNavigation} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigate;
