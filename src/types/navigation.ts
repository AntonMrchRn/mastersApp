import { NativeStackNavigationProp } from 'react-native-screens/native-stack';

import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { AppScreenName, AppStackParamList } from '@/navigation/AppNavigation';
import {
  ProfileScreenName,
  ProfileStackParamList,
} from '@/navigation/ProfileNavigation';
import { BottomTabName, BottomTabParamList } from '@/navigation/TabNavigation';

type RecoveryConfirmationScreenRoute = RouteProp<
  AppStackParamList,
  AppScreenName.RecoveryConfirmation
>;
type PhoneEditingScreenRoute = RouteProp<
  ProfileStackParamList,
  ProfileScreenName.PhoneEditing
>;
type EmailEditingScreenRoute = RouteProp<
  ProfileStackParamList,
  ProfileScreenName.EmailEditing
>;
type PhoneEditingConfirmationScreenRoute = RouteProp<
  ProfileStackParamList,
  ProfileScreenName.PhoneEditingConfirmation
>;
type BankDetailsScreenRoute = RouteProp<
  ProfileStackParamList,
  ProfileScreenName.BankDetails
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
  BottomTabParamList,
  BottomTabName.TaskSearch
>;
type ProfileScreenNavigationProp = NativeStackNavigationProp<
  ProfileStackParamList,
  ProfileScreenName.Profile
>;
type BankDetailsScreenNavigationProp = NativeStackNavigationProp<
  ProfileStackParamList,
  ProfileScreenName.BankDetails
>;
type PhoneEditingConfirmationScreenNavigationProp = NativeStackNavigationProp<
  ProfileStackParamList,
  ProfileScreenName.PhoneEditingConfirmation
>;
type CompositeRecoveryConfirmationAndEmailNavigationProp =
  CompositeNavigationProp<
    StackNavigationProp<AppStackParamList, AppScreenName.RecoveryConfirmation>,
    StackNavigationProp<AppStackParamList, AppScreenName.Email>
  >;
type CompositeEditingNavigationProp = CompositeNavigationProp<
  StackNavigationProp<ProfileStackParamList, ProfileScreenName.EmailEditing>,
  StackNavigationProp<ProfileStackParamList, ProfileScreenName.PhoneEditing>
>;

export type {
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
