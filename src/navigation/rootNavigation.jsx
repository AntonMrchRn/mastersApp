import React, { useEffect, useState } from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import TabNavigation from './App/TabNavigation';
import AuthNavigation from './Auth';
import { useCheckLogin } from '../utils/hooks/useCheckLogin';
import SplashScreen from 'react-native-splash-screen';

const Stack = createStackNavigator();

const RootNavigate = () => {
  const [checkLogin, isAuth] = useCheckLogin();
  const [hideSplash, setHideSplash] = useState(false);

  useEffect(() => {
    checkLogin();
    setTimeout(() => {
      setHideSplash(true);
    }, 1500);
  }, []);

  useEffect(() => {
    hideSplash && SplashScreen.hide();
  }, [hideSplash]);

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
