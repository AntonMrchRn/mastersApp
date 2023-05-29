import React, { useEffect, useState } from 'react';
import SplashScreen from 'react-native-splash-screen';

import { createStackNavigator } from '@react-navigation/stack';

import { useCheckLogin } from '@/hooks/useCheckLogin';
import TabNavigation from '@/navigation/App/TabNavigation';
import AuthNavigation from '@/navigation/Auth';
import { RootNavigationParamList, RootScreenName } from '@/types/navigation';

const screenOptions = { headerShown: false };
const Stack = createStackNavigator<RootNavigationParamList>();

const RootNavigation = () => {
  const { checkLogin, isAuth } = useCheckLogin();
  const [isLoad, setIsLoad] = useState<boolean>(false);

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
      screenOptions={screenOptions}
      initialRouteName={RootScreenName.AppNavigator}
    >
      {isAuth ? (
        <Stack.Screen
          name={RootScreenName.AppNavigator}
          component={TabNavigation}
        />
      ) : (
        <Stack.Screen
          name={RootScreenName.AuthNavigator}
          component={AuthNavigation}
        />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigation;
