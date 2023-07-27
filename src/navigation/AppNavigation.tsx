import React, { useEffect, useState } from 'react';
import SplashScreen from 'react-native-splash-screen';

import { createStackNavigator } from '@react-navigation/stack';

import Header from '@/components/Header';
import { useCheckLogin } from '@/hooks/useCheckLogin';
import useConnectionToast from '@/hooks/useConnectionToast';
import { TabNavigation } from '@/navigation/TabNavigation';
import EmailScreen from '@/screens/auth/EmailScreen';
import ErrorScreen from '@/screens/auth/ErrorScreen';
import PasswordScreen from '@/screens/auth/PasswordScreen';
import RecoveryConfirmationScreen from '@/screens/auth/RecoveryConfirmationScreen';
import RecoveryScreen from '@/screens/auth/RecoveryScreen';
import SignInScreen from '@/screens/auth/SignInScreen';
import { CommentsChatScreen } from '@/screens/task/CommentsChatScreen';
import { CompetitorEstimatesScreen } from '@/screens/task/CompetitorEstimatesScreen';
import { EstimateAddMaterialScreen } from '@/screens/task/EstimateAddMaterialScreen';
import { EstimateAddServiceScreen } from '@/screens/task/EstimateAddServiceScreen';
import { EstimateEditScreen } from '@/screens/task/EstimateEditScreen';
import { EstimateSubmissionScreen } from '@/screens/task/EstimateSubmissionScreen';
import { EstimateSubmissionSuccessScreen } from '@/screens/task/EstimateSubmissionSuccessScreen';
import { NewMaterialScreen } from '@/screens/task/NewMaterialScreen';
import { TaskCardScreen } from '@/screens/task/TaskCardScreen';
import { TradingResultsScreen } from '@/screens/task/TradingResultsScreen';
import { WebViewScreen } from '@/screens/WebViewScreen';
import { Executor, Service } from '@/store/api/tasks/types';
import { StatusType } from '@/types/task';

export enum AppScreenName {
  AppNavigator = 'AppNavigator',
  SignIn = 'SignIn',
  Recovery = 'Recovery',
  Email = 'Email',
  RecoveryConfirmation = 'RecoveryConfirmation',
  Password = 'Password',
  Error = 'Error',
  TaskCard = 'TaskCard',
  EstimateEdit = 'EstimateEdit',
  EstimateAddMaterial = 'EstimateAddMaterial',
  EstimateAddService = 'EstimateAddService',
  CompetitorEstimates = 'CompetitorEstimates',
  CommentsChat = 'CommentsChatScreen',
  WebView = 'WebView',
  EstimateSubmission = 'EstimateSubmission',
  TradingResults = 'TradingResults',
  NewMaterial = 'NewMaterial',
  EstimateSubmissionSuccess = 'EstimateSubmissionSuccess',
}
export type AppStackParamList = {
  [AppScreenName.SignIn]: undefined;
  [AppScreenName.AppNavigator]: undefined;
  [AppScreenName.Email]: undefined;
  [AppScreenName.Recovery]: undefined;
  [AppScreenName.Password]: undefined;
  [AppScreenName.CommentsChat]: {
    taskId: number;
    executors?: Executor[];
    statusID?: StatusType;
  };
  [AppScreenName.RecoveryConfirmation]: {
    phone: string;
  };
  [AppScreenName.Error]: undefined;
  [AppScreenName.TaskCard]: { taskId: number };
  [AppScreenName.EstimateEdit]: {
    taskId: number;
    serviceId: number;
    materialName?: string;
  };
  [AppScreenName.EstimateAddMaterial]: {
    serviceId: number;
    taskId: number;
    fromEstimateSubmission?: boolean;
  };
  [AppScreenName.EstimateAddService]: {
    taskId: number;
    service: Service;
    fromEstimateSubmission?: boolean;
  };
  [AppScreenName.CompetitorEstimates]: { taskId: number };
  [AppScreenName.TradingResults]: { taskId: number };
  [AppScreenName.WebView]: { uri: string };
  [AppScreenName.EstimateSubmission]: { taskId: number };
  [AppScreenName.NewMaterial]: { taskId: number };
  [AppScreenName.EstimateSubmissionSuccess]: { taskId: number };
};
const screenOptions = { headerShown: false };
const Stack = createStackNavigator<AppStackParamList>();
export const AppNavigation = () => {
  useConnectionToast();
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
            name={AppScreenName.TaskCard}
            component={TaskCardScreen}
          />
          <Stack.Screen
            name={AppScreenName.CommentsChat}
            component={CommentsChatScreen}
            options={{
              headerShown: true,
              header: props => <Header {...props} title={'Чат'} />,
            }}
          />
          <Stack.Screen
            name={AppScreenName.EstimateEdit}
            component={EstimateEditScreen}
            options={{
              headerShown: true,
              header: props => (
                <Header {...props} title={'Редактирование сметы'} />
              ),
            }}
          />
          <Stack.Screen
            name={AppScreenName.EstimateAddMaterial}
            component={EstimateAddMaterialScreen}
            options={{
              headerShown: true,
              header: props => <Header {...props} title={'Новый материал'} />,
            }}
          />
          <Stack.Screen
            name={AppScreenName.EstimateAddService}
            component={EstimateAddServiceScreen}
            options={{
              headerShown: true,
              header: props => <Header {...props} title={'Новая услуга'} />,
            }}
          />
          <Stack.Screen
            name={AppScreenName.CompetitorEstimates}
            component={CompetitorEstimatesScreen}
            options={{
              headerShown: true,
              header: props => (
                <Header {...props} title={'Сметы других кандидатов'} />
              ),
            }}
          />
          <Stack.Screen
            name={AppScreenName.TradingResults}
            component={TradingResultsScreen}
            options={{
              headerShown: true,
              header: props => (
                <Header {...props} title={'Сметы других кандидатов'} />
              ),
            }}
          />
          <Stack.Screen
            name={AppScreenName.EstimateSubmission}
            component={EstimateSubmissionScreen}
            options={{
              headerShown: true,
              header: props => <Header {...props} title={'Подача сметы'} />,
            }}
          />
          <Stack.Screen
            name={AppScreenName.NewMaterial}
            component={NewMaterialScreen}
            options={{
              headerShown: true,
              header: props => <Header {...props} title={'Новый материал'} />,
            }}
          />
          <Stack.Screen
            name={AppScreenName.EstimateSubmissionSuccess}
            component={EstimateSubmissionSuccessScreen}
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
        </>
      )}
      <Stack.Screen name={AppScreenName.Error} component={ErrorScreen} />
      <Stack.Screen
        name={AppScreenName.WebView}
        component={WebViewScreen}
        options={{
          headerShown: true,
          header: props => <Header {...props} title={''} />,
        }}
      />
    </Stack.Navigator>
  );
};
