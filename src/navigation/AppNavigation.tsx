import React, { useEffect, useState } from 'react';
import SplashScreen from 'react-native-splash-screen';

import { createStackNavigator } from '@react-navigation/stack';

import Header from '@/components/Header';
import { useCheckLogin } from '@/hooks/useCheckLogin';
import useConnectionToast from '@/hooks/useConnectionToast';
import { TabNavigation } from '@/navigation/TabNavigation';
import { AccessRestrictedScreen } from '@/screens/auth/AccessRestrictedScreen';
import EmailScreen from '@/screens/auth/EmailScreen';
import ErrorScreen from '@/screens/auth/ErrorScreen';
import PasswordScreen from '@/screens/auth/PasswordScreen';
import RecoveryConfirmationScreen from '@/screens/auth/RecoveryConfirmationScreen';
import RecoveryScreen from '@/screens/auth/RecoveryScreen';
import SignInScreen from '@/screens/auth/SignInScreen';
import { CommentsChatScreen } from '@/screens/task/CommentsChatScreen';
import { CompetitorEstimatesScreen } from '@/screens/task/CompetitorEstimatesScreen';
import ContractorsScreen from '@/screens/task/Contractors';
import { EstimateAddMaterialScreen } from '@/screens/task/EstimateAddMaterialScreen';
import { EstimateAddServiceScreen } from '@/screens/task/EstimateAddServiceScreen';
import { EstimateEditScreen } from '@/screens/task/EstimateEditScreen';
import { EstimateSubmissionScreen } from '@/screens/task/EstimateSubmissionScreen';
import { EstimateSubmissionSuccessScreen } from '@/screens/task/EstimateSubmissionSuccessScreen';
import { NewMaterialScreen } from '@/screens/task/NewMaterialScreen';
import { TaskCardScreen } from '@/screens/task/TaskCardScreen';
import { TradingResultsScreen } from '@/screens/task/TradingResultsScreen';
import { WebViewScreen } from '@/screens/WebViewScreen';
import { Offer, Service } from '@/store/api/tasks/types';

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
  UserEstimateEdit = 'UserEstimateEdit',
  TradingResults = 'TradingResults',
  NewMaterial = 'NewMaterial',
  EstimateSubmissionSuccess = 'EstimateSubmissionSuccess',
  Contractors = 'Contractors',
  AccessRestricted = 'AccessRestricted',
}
export type AppStackParamList = {
  [AppScreenName.AccessRestricted]: undefined;
  [AppScreenName.SignIn]: undefined;
  [AppScreenName.AppNavigator]: undefined;
  [AppScreenName.Email]: undefined;
  [AppScreenName.Recovery]: undefined;
  [AppScreenName.Password]: undefined;
  [AppScreenName.CommentsChat]: {
    taskId: number;
    recipientIDs: number[];
    isMessageInputAvailable: boolean;
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
    /**
     * Переход из скрина изменения сметы офера
     */
    fromEstimateSubmission?: boolean;
    /**
     * Редактирование уже имеющейся сметы офера
     */
    isEdit?: boolean;
  };
  [AppScreenName.EstimateAddService]: {
    taskId: number;
    service: Service;
    fromEstimateSubmission?: boolean;
  };
  [AppScreenName.CompetitorEstimates]: { taskId: number; userID: number };
  [AppScreenName.TradingResults]: {
    taskId: number;
    winnerOffer: Offer | undefined;
  };
  [AppScreenName.WebView]: { uri: string };
  [AppScreenName.EstimateSubmission]: { taskId: number; isEdit?: boolean };
  [AppScreenName.NewMaterial]: {
    taskId: number;
    services: Service[];
    isEdit?: boolean;
    fromEstimateSubmission?: boolean;
  };
  [AppScreenName.EstimateSubmissionSuccess]: { taskId: number };
  [AppScreenName.Contractors]: {
    taskId: number;
    curatorId: number;
    curatorMemberId?: number;
    isInvitedCurator: boolean;
  };
};
const screenOptions = { headerShown: false };
const Stack = createStackNavigator<AppStackParamList>();
export const AppNavigation = () => {
  useConnectionToast();
  const { checkLogin, isAuth, isExecutor } = useCheckLogin();
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
          {isExecutor ? (
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
                name={AppScreenName.Contractors}
                component={ContractorsScreen}
                options={{
                  headerShown: true,
                  header: props => <Header {...props} title="Подрядчики" />,
                }}
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
                  header: props => (
                    <Header {...props} title={'Новый материал'} />
                  ),
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
                  header: props => (
                    <Header
                      {...props}
                      title={
                        (
                          props.route
                            .params as AppStackParamList[AppScreenName.EstimateSubmission]
                        )?.isEdit
                          ? 'Редактирование сметы'
                          : 'Подача сметы'
                      }
                    />
                  ),
                }}
              />
              <Stack.Screen
                name={AppScreenName.NewMaterial}
                component={NewMaterialScreen}
                options={{
                  headerShown: true,
                  header: props => (
                    <Header {...props} title={'Новый материал'} />
                  ),
                }}
              />
              <Stack.Screen
                name={AppScreenName.EstimateSubmissionSuccess}
                component={EstimateSubmissionSuccessScreen}
              />
            </>
          ) : (
            <Stack.Screen
              name={AppScreenName.AccessRestricted}
              component={AccessRestrictedScreen}
            />
          )}
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
