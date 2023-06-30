import React, { useEffect, useState } from 'react';
import SplashScreen from 'react-native-splash-screen';

import { createStackNavigator } from '@react-navigation/stack';

import Header from '@/components/Header';
import { useCheckLogin } from '@/hooks/useCheckLogin';
import { TabNavigation } from '@/navigation/TabNavigation';
import EmailScreen from '@/screens/auth/EmailScreen';
import ErrorScreen from '@/screens/auth/ErrorScreen';
import PasswordScreen from '@/screens/auth/PasswordScreen';
import RecoveryConfirmationScreen from '@/screens/auth/RecoveryConfirmationScreen';
import RecoveryScreen from '@/screens/auth/RecoveryScreen';
import SignInScreen from '@/screens/auth/SignInScreen';
import { EstimateAddMaterialScreen } from '@/screens/tabs/EstimateAddMaterialScreen';
import { EstimateEditScreen } from '@/screens/tabs/EstimateEditScreen';
import { TaskCardScreen } from '@/screens/tabs/TaskCardScreen';
import {
  AppScreenName,
  AppStackParamList,
  TaskNavigatorScreenName,
} from '@/types/navigation';

const screenOptions = { headerShown: false };
const Stack = createStackNavigator<AppStackParamList>();

export const AppNavigation = () => {
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
    <Stack.Navigator screenOptions={screenOptions}>
      {isAuth ? (
        <>
          <Stack.Screen
            name={AppScreenName.AppNavigator}
            component={TabNavigation}
          />
          <Stack.Screen
            name={TaskNavigatorScreenName.TaskCard}
            component={TaskCardScreen}
          />
          <Stack.Screen
            name={TaskNavigatorScreenName.EstimateEdit}
            component={EstimateEditScreen}
            options={{
              headerShown: true,
              header: props => (
                <Header {...props} title={'Редактирование сметы'} />
              ),
            }}
          />
          <Stack.Screen
            name={TaskNavigatorScreenName.EstimateAddMaterial}
            component={EstimateAddMaterialScreen}
            options={{
              headerShown: true,
              header: props => <Header {...props} title={'Новый материал'} />,
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen name={AppScreenName.SignIn} component={SignInScreen} />
          <Stack.Screen
            name={AppScreenName.Recovery}
            component={RecoveryScreen}
          />
          <Stack.Screen name={AppScreenName.Email} component={EmailScreen} />
          <Stack.Screen
            name={AppScreenName.RecoveryConfirmation}
            component={RecoveryConfirmationScreen}
          />
          <Stack.Screen
            name={AppScreenName.Password}
            component={PasswordScreen}
          />
          <Stack.Screen name={AppScreenName.Error} component={ErrorScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};
