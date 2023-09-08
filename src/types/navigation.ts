import { NativeStackNavigationProp } from 'react-native-screens/native-stack';

import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
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
type PersonalDataScreenRoute = RouteProp<
  ProfileStackParamList,
  ProfileScreenName.PersonalDataEditing
>;
type BankDetailsScreenRoute = RouteProp<
  ProfileStackParamList,
  ProfileScreenName.BankDetails
>;
type TeamMemberDetailsScreenRoute = RouteProp<
  ProfileStackParamList,
  ProfileScreenName.TeamMemberDetails
>;
type AccountDeletionScreenRoute = RouteProp<
  ProfileStackParamList,
  ProfileScreenName.AccountDeletion
>;
type ContractorsScreenRoute = RouteProp<
  AppStackParamList,
  AppScreenName.Contractors
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
type ContractorsInvitationScreenNavigationProp = NativeStackNavigationProp<
  ProfileStackParamList,
  ProfileScreenName.ContractorsInvitation
>;
type ChangePasswordScreenNavigationProp = NativeStackNavigationProp<
  ProfileStackParamList,
  ProfileScreenName.ChangePassword
>;
type AccountDeletionScreenNavigationProp = NativeStackNavigationProp<
  ProfileStackParamList,
  ProfileScreenName.AccountDeletion
>;
type ProfileStackNavigationProp = NativeStackNavigationProp<
  BottomTabParamList,
  BottomTabName.ProfileNavigation
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
type CompositeTaskCardNavigationProp = CompositeNavigationProp<
  StackNavigationProp<AppStackParamList, AppScreenName.TaskCard, undefined>,
  BottomTabNavigationProp<BottomTabParamList, keyof BottomTabParamList>
>;

export type {
  EmailEditingScreenRoute,
  PhoneEditingScreenRoute,
  ContractorsScreenRoute,
  BankDetailsScreenRoute,
  PersonalDataScreenRoute,
  AccountDeletionScreenRoute,
  TeamMemberDetailsScreenRoute,
  RecoveryConfirmationScreenRoute,
  PhoneEditingConfirmationScreenRoute,
  ErrorScreenNavigationProp,
  SignInScreenNavigationProp,
  ProfileStackNavigationProp,
  ProfileScreenNavigationProp,
  PasswordScreenNavigationProp,
  RecoveryScreenNavigationProp,
  TaskCardScreenNavigationProp,
  CompositeEditingNavigationProp,
  BankDetailsScreenNavigationProp,
  ChangePasswordScreenNavigationProp,
  AccountDeletionScreenNavigationProp,
  ContractorsInvitationScreenNavigationProp,
  PhoneEditingConfirmationScreenNavigationProp,
  CompositeTaskCardNavigationProp,
  CompositeRecoveryConfirmationAndEmailNavigationProp,
};
