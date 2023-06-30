import { NativeStackNavigationProp } from 'react-native-screens/native-stack';

import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

enum BottomTab {
  TaskSearch = 'TaskSearch',
  MyTasks = 'MyTasks',
  ProfileNavigation = 'ProfileNavigation',
}
enum AppScreenName {
  AppNavigator = 'AppNavigator',
  AuthNavigator = 'AuthNavigator',
  TaskNavigator = 'AuthNavigator',
  SignIn = 'SignIn',
  Recovery = 'Recovery',
  Email = 'Email',
  RecoveryConfirmation = 'RecoveryConfirmation',
  Password = 'Password',
  Error = 'Error',
}
enum ProfileNavigatorScreenName {
  Profile = 'Profile',
  BankDetails = 'BankDetails',
  EmailEditing = 'EmailEditing',
  PhoneEditing = 'PhoneEditing',
  PersonalDataEditing = 'PersonalDataEditing',
  PhoneEditingConfirmation = 'PhoneEditingConfirmation',
}
enum TaskNavigatorScreenName {
  TaskCard = 'TaskCard',
  EstimateEdit = 'EstimateEdit',
  EstimateAddMaterial = 'EstimateAddMaterial',
}

export type AppStackParamList = {
  ProfileNavigation: { id: number } | undefined;
  TaskSearchNavigation: { id: number } | undefined;
  [AppScreenName.SignIn]: undefined;
  [AppScreenName.AppNavigator]: undefined;
  [AppScreenName.Email]: undefined;
  [AppScreenName.Recovery]: undefined;
  [AppScreenName.Password]: undefined;
  [AppScreenName.RecoveryConfirmation]: {
    phone: string;
  };
  [AppScreenName.Error]: undefined;
};

type TabNavigationParamList = {
  [BottomTab.TaskSearch]: undefined;
  [BottomTab.MyTasks]: undefined;
  [BottomTab.ProfileNavigation]: undefined;
};
type ProfileNavigationParamList = {
  Profile: undefined;
  BankDetails: {
    bankID?: string | null;
    bankName?: string | null;
    checkingAccount?: string | null;
    correspondingAccount?: string | null;
  };
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
type TaskNavigationParamList = {
  TaskCard: { taskId: number };
  EstimateEdit: {
    taskId: number;
    serviceId: number;
    materialName?: string;
  };
  EstimateAddMaterial: { serviceId: number; taskId: number };
};

type RecoveryConfirmationScreenRoute = RouteProp<
  AppStackParamList,
  AppScreenName.RecoveryConfirmation
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
type BankDetailsScreenRoute = RouteProp<
  ProfileNavigationParamList,
  ProfileNavigatorScreenName.BankDetails
>;

type SignInScreenNavigationProp = NativeStackNavigationProp<
  AppStackParamList,
  AppScreenName.SignIn
>;
type PasswordScreenNavigationProp = NativeStackNavigationProp<
  AppStackParamList,
  AppScreenName.Password
>;
type RecoveryScreenNavigationProp = NativeStackNavigationProp<
  AppStackParamList,
  AppScreenName.Recovery
>;
type ErrorScreenNavigationProp = NativeStackNavigationProp<
  AppStackParamList,
  AppScreenName.Error
>;
type TaskCardScreenNavigationProp = NativeStackNavigationProp<
  TabNavigationParamList,
  BottomTab.TaskSearch
>;
type ProfileScreenNavigationProp = NativeStackNavigationProp<
  ProfileNavigationParamList,
  ProfileNavigatorScreenName.Profile
>;
type BankDetailsScreenNavigationProp = NativeStackNavigationProp<
  ProfileNavigationParamList,
  ProfileNavigatorScreenName.BankDetails
>;
type PhoneEditingConfirmationScreenNavigationProp = NativeStackNavigationProp<
  ProfileNavigationParamList,
  ProfileNavigatorScreenName.PhoneEditingConfirmation
>;
type CompositeRecoveryConfirmationAndEmailNavigationProp =
  CompositeNavigationProp<
    StackNavigationProp<AppStackParamList, AppScreenName.RecoveryConfirmation>,
    StackNavigationProp<AppStackParamList, AppScreenName.Email>
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
  AppScreenName,
  ProfileNavigatorScreenName,
  TaskNavigatorScreenName,
};
export type {
  TabNavigationParamList,
  ProfileNavigationParamList,
  EmailEditingScreenRoute,
  PhoneEditingScreenRoute,
  BankDetailsScreenRoute,
  RecoveryConfirmationScreenRoute,
  PhoneEditingConfirmationScreenRoute,
  ErrorScreenNavigationProp,
  SignInScreenNavigationProp,
  ProfileScreenNavigationProp,
  PasswordScreenNavigationProp,
  RecoveryScreenNavigationProp,
  TaskCardScreenNavigationProp,
  BankDetailsScreenNavigationProp,
  PhoneEditingConfirmationScreenNavigationProp,
  CompositeEditingNavigationProp,
  CompositeRecoveryConfirmationAndEmailNavigationProp,
  TaskNavigationParamList,
};
