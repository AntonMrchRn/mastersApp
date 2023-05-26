import { NativeStackNavigationProp } from 'react-native-screens/native-stack';

import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

enum AuthScreenName {
  SignIn = 'SignIn',
  Recovery = 'Recovery',
  Email = 'Email',
  RecoveryConfirm = 'RecoveryConfirm',
  Password = 'Password',
  Error = 'Error',
}

enum BottomTab {
  TaskSearchNavigation = 'TaskSearchNavigation',
  MyTasksNavigation = 'MyTasksNavigation',
  ProfileNavigation = 'ProfileNavigation',
}

enum RootScreenName {
  AppNavigator = 'AppNavigator',
  AuthNavigator = 'AuthNavigator',
}

enum TaskSearchNavigatorScreenName {
  TaskSearch = 'TaskSearch',
  TaskCard = 'TaskCard',
}

enum MyTasksNavigatorScreenName {
  MyTasks = 'MyTasks',
}

enum ProfileNavigatorScreenName {
  Profile = 'Profile',
}

type RootNavigationParamList = {
  [RootScreenName.AppNavigator]: undefined;
  [RootScreenName.AuthNavigator]: undefined;
};

type AuthNavigationParamList = {
  [AuthScreenName.SignIn]: undefined;
  [AuthScreenName.Email]: undefined;
  [AuthScreenName.Recovery]: undefined;
  [AuthScreenName.Password]: undefined;
  [AuthScreenName.RecoveryConfirm]: {
    tel: string;
  };
  [AuthScreenName.Error]: undefined;
};

type TabNavigationParamList = {
  [BottomTab.TaskSearchNavigation]: undefined;
  [BottomTab.MyTasksNavigation]: undefined;
  [BottomTab.ProfileNavigation]: undefined;
};

type MyTasksNavigationParamList = {
  MyTasks: undefined;
};

type ProfileNavigationParamList = {
  Profile: undefined;
};

type TaskSearchNavigationParamList = {
  TaskSearch: undefined;
  TaskCard: undefined;
};

type SignInScreenNavigationProp = NativeStackNavigationProp<
  AuthNavigationParamList,
  AuthScreenName.SignIn
>;
type PasswordScreenNavigationProp = NativeStackNavigationProp<
  AuthNavigationParamList,
  AuthScreenName.Password
>;
type RecoveryScreenNavigationProp = NativeStackNavigationProp<
  AuthNavigationParamList,
  AuthScreenName.Recovery
>;
type RecoveryConfirmScreenRoute = RouteProp<
  AuthNavigationParamList,
  AuthScreenName.RecoveryConfirm
>;
type ErrorScreenNavigationProp = NativeStackNavigationProp<
  AuthNavigationParamList,
  AuthScreenName.Error
>;
type TaskCardScreenNavigationProp = NativeStackNavigationProp<
  TaskSearchNavigationParamList,
  TaskSearchNavigatorScreenName.TaskCard
>;

type CompositeRecoveryConfirmAndEmailNavigationProp = CompositeNavigationProp<
  StackNavigationProp<AuthNavigationParamList, AuthScreenName.RecoveryConfirm>,
  StackNavigationProp<AuthNavigationParamList, AuthScreenName.Email>
>;

export {
  BottomTab,
  AuthScreenName,
  RootScreenName,
  MyTasksNavigatorScreenName,
  ProfileNavigatorScreenName,
  TaskSearchNavigatorScreenName,
};
export type {
  TabNavigationParamList,
  RootNavigationParamList,
  AuthNavigationParamList,
  ProfileNavigationParamList,
  MyTasksNavigationParamList,
  TaskSearchNavigationParamList,
  RecoveryConfirmScreenRoute,
  ErrorScreenNavigationProp,
  SignInScreenNavigationProp,
  PasswordScreenNavigationProp,
  RecoveryScreenNavigationProp,
  TaskCardScreenNavigationProp,
  CompositeRecoveryConfirmAndEmailNavigationProp,
};
