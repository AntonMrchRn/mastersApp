import { NativeStackNavigationProp } from 'react-native-screens/native-stack';

import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Material, Service } from '@/store/api/tasks/types';

enum AuthScreenName {
  SignIn = 'SignIn',
  Recovery = 'Recovery',
  Email = 'Email',
  RecoveryConfirmation = 'RecoveryConfirmation',
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
  EstimateEdit = 'EstimateEdit',
}
enum MyTasksNavigatorScreenName {
  MyTasks = 'MyTasks',
}
enum ProfileNavigatorScreenName {
  Profile = 'Profile',
  EmailEditing = 'EmailEditing',
  PhoneEditing = 'PhoneEditing',
  PhoneEditingConfirmation = 'PhoneEditingConfirmation',
  PersonalDataEditing = 'PersonalDataEditing',
}

export type RootStackParamList = {
  ProfileNavigation: { id: number } | undefined;
};

type RootNavigationParamList = {
  [RootScreenName.AppNavigator]: undefined;
  [RootScreenName.AuthNavigator]: undefined;
};
type AuthNavigationParamList = {
  [AuthScreenName.SignIn]: undefined;
  [AuthScreenName.Email]: undefined;
  [AuthScreenName.Recovery]: undefined;
  [AuthScreenName.Password]: undefined;
  [AuthScreenName.RecoveryConfirmation]: {
    phone: string;
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
  EmailEditing: {
    email: string | null;
  };
  PhoneEditing: {
    phone: string | null;
  };
  PhoneEditingConfirmation: {
    phone: string;
  };
  PersonalDataEditing: undefined;
};
type TaskSearchNavigationParamList = {
  TaskSearch: undefined;
  TaskCard: { taskId: number };
  EstimateEdit: {
    taskId: number;
    serviceId: number;
    materialName?: string;
  };
};

type RecoveryConfirmationScreenRoute = RouteProp<
  AuthNavigationParamList,
  AuthScreenName.RecoveryConfirmation
>;
type PhoneEditingScreenRoute = RouteProp<
  ProfileNavigationParamList,
  ProfileNavigatorScreenName.PhoneEditing
>;
type EmailEditingScreenRoute = RouteProp<
  ProfileNavigationParamList,
  ProfileNavigatorScreenName.EmailEditing
>;
type PhoneEditingConfirmationScreenRoute = RouteProp<
  ProfileNavigationParamList,
  ProfileNavigatorScreenName.PhoneEditingConfirmation
>;

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
type ErrorScreenNavigationProp = NativeStackNavigationProp<
  AuthNavigationParamList,
  AuthScreenName.Error
>;
type TaskCardScreenNavigationProp = NativeStackNavigationProp<
  TaskSearchNavigationParamList,
  TaskSearchNavigatorScreenName.TaskCard
>;
type ProfileScreenNavigationProp = NativeStackNavigationProp<
  ProfileNavigationParamList,
  ProfileNavigatorScreenName.Profile
>;
type PhoneEditingConfirmationScreenNavigationProp = NativeStackNavigationProp<
  ProfileNavigationParamList,
  ProfileNavigatorScreenName.PhoneEditingConfirmation
>;
type CompositeRecoveryConfirmationAndEmailNavigationProp =
  CompositeNavigationProp<
    StackNavigationProp<
      AuthNavigationParamList,
      AuthScreenName.RecoveryConfirmation
    >,
    StackNavigationProp<AuthNavigationParamList, AuthScreenName.Email>
  >;
type CompositeEditingNavigationProp = CompositeNavigationProp<
  StackNavigationProp<
    ProfileNavigationParamList,
    ProfileNavigatorScreenName.EmailEditing
  >,
  StackNavigationProp<
    ProfileNavigationParamList,
    ProfileNavigatorScreenName.PhoneEditing
  >
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
  EmailEditingScreenRoute,
  PhoneEditingScreenRoute,
  RecoveryConfirmationScreenRoute,
  PhoneEditingConfirmationScreenRoute,
  ErrorScreenNavigationProp,
  SignInScreenNavigationProp,
  ProfileScreenNavigationProp,
  PasswordScreenNavigationProp,
  RecoveryScreenNavigationProp,
  TaskCardScreenNavigationProp,
  PhoneEditingConfirmationScreenNavigationProp,
  CompositeEditingNavigationProp,
  CompositeRecoveryConfirmationAndEmailNavigationProp,
};
