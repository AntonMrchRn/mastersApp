import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import AccountDeletionScreen from '@/screens/profile/AccountDeletionScreen';
import BankDetailsScreen from '@/screens/profile/BankDetailsScreen';
import ChangePasswordScreen from '@/screens/profile/ChangePasswordScreen';
import ContractorsInvitationScreen from '@/screens/profile/ContractorsInvitationScreen';
import EmailEditingScreen from '@/screens/profile/EmailEditingScreen';
import PersonalDataEditingScreen from '@/screens/profile/PersonalDataEditingScreen';
import PhoneEditingConfirmationScreen from '@/screens/profile/PhoneEditingConfirmationScreen';
import PhoneEditingScreen from '@/screens/profile/PhoneEditingScreen';
import TeamMemberDetailsScreen from '@/screens/profile/TeamMemberDetailsScreen';
import TelegramBotScreen from '@/screens/profile/TelegramBotScreen';
import ProfileScreen from '@/screens/tabs/ProfileScreen';
import { TabProf } from '@/screens/tabs/ProfileScreen/useProfile';

export enum ProfileScreenName {
  Profile = 'Profile',
  BankDetails = 'BankDetails',
  TelegramBot = 'TelegramBot',
  EmailEditing = 'EmailEditing',
  PhoneEditing = 'PhoneEditing',
  ChangePassword = 'ChangePassword',
  AccountDeletion = 'AccountDeletion',
  TeamMemberDetails = 'TeamMemberDetails',
  PersonalDataEditing = 'PersonalDataEditing',
  ContractorsInvitation = 'ContractorsInvitation',
  PhoneEditingConfirmation = 'PhoneEditingConfirmation',
}
export type ProfileStackParamList = {
  [ProfileScreenName.Profile]: { tab?: TabProf };
  [ProfileScreenName.BankDetails]: {
    isCompany: boolean;
    bankID: string | null;
    bankName: string | null;
    checkingAccount: string | null;
    correspondingAccount: string | null;
  };
  [ProfileScreenName.EmailEditing]: {
    email: string | null;
  };
  [ProfileScreenName.PhoneEditing]: {
    phone: string | null;
  };
  [ProfileScreenName.PhoneEditingConfirmation]: {
    phone: string;
  };
  [ProfileScreenName.PersonalDataEditing]: {
    name: string | null;
    sname: string | null;
    pname: string | null;
  };
  [ProfileScreenName.ContractorsInvitation]: undefined;
  [ProfileScreenName.TeamMemberDetails]: {
    contractorIDs: number[];
    teamMemberId: number;
    isContractor: boolean;
  };
  [ProfileScreenName.ChangePassword]: undefined;
  [ProfileScreenName.TelegramBot]: undefined;
  [ProfileScreenName.AccountDeletion]: {
    hasActiveTasks: boolean;
  };
};
const screenOptions = { headerShown: false };
const Stack = createStackNavigator<ProfileStackParamList>();

export const ProfileNavigation = () => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen name={ProfileScreenName.Profile} component={ProfileScreen} />
    <Stack.Screen
      name={ProfileScreenName.EmailEditing}
      component={EmailEditingScreen}
    />
    <Stack.Screen
      name={ProfileScreenName.PhoneEditing}
      component={PhoneEditingScreen}
    />
    <Stack.Screen
      name={ProfileScreenName.PhoneEditingConfirmation}
      component={PhoneEditingConfirmationScreen}
    />
    <Stack.Screen
      name={ProfileScreenName.PersonalDataEditing}
      component={PersonalDataEditingScreen}
    />
    <Stack.Screen
      name={ProfileScreenName.BankDetails}
      component={BankDetailsScreen}
    />
    <Stack.Screen
      name={ProfileScreenName.ContractorsInvitation}
      component={ContractorsInvitationScreen}
    />
    <Stack.Screen
      name={ProfileScreenName.TeamMemberDetails}
      component={TeamMemberDetailsScreen}
    />
    <Stack.Screen
      name={ProfileScreenName.ChangePassword}
      component={ChangePasswordScreen}
    />
    <Stack.Screen
      name={ProfileScreenName.TelegramBot}
      component={TelegramBotScreen}
    />
    <Stack.Screen
      name={ProfileScreenName.AccountDeletion}
      component={AccountDeletionScreen}
    />
  </Stack.Navigator>
);
