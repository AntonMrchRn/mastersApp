import { NativeStackNavigationProp } from 'react-native-screens/native-stack';

import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { AppScreenName, AppStackParamList } from '@/navigation/AppNavigation';

enum BottomTab {
  TaskSearch = 'TaskSearch',
  MyTasks = 'MyTasks',
  ProfileNavigation = 'ProfileNavigation',
  TaskSearchNavigation = 'TaskSearchNavigation',
}

enum ProfileNavigatorScreenName {
  Profile = 'Profile',
  BankDetails = 'BankDetails',
  EmailEditing = 'EmailEditing',
  PhoneEditing = 'PhoneEditing',
  PersonalDataEditing = 'PersonalDataEditing',
  PhoneEditingConfirmation = 'PhoneEditingConfirmation',
}
type RootStackParamList = {
  ProfileNavigation: undefined;
  TaskSearchNavigation: undefined;
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

export { BottomTab, ProfileNavigatorScreenName };
export type {
  RootStackParamList,
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
};
