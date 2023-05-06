import React, { useEffect, useState } from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import TabNavigation from './App/TabNavigation';
import AuthNavigation from './Auth';
import { useCheckLogin } from '../utils/hooks/useCheckLogin';
import SplashScreen from 'react-native-splash-screen';

export type RootNavigationParamList = {
  AppNavigation: undefined;
  AuthNavigation: undefined;
};

const Stack = createStackNavigator<RootNavigationParamList>();

const RootNavigate = () => {
  const { checkLogin, isAuth } = useCheckLogin();
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    isLoad && SplashScreen.hide();
  }, [isLoad]);

  useEffect(() => {
    checkLogin();
    setTimeout(() => {
      setIsLoad(true);
    }, 1000);
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
