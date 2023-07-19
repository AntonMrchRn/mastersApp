import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import BankDetailsScreen from '@/screens/profile/BankDetailsScreen';
import EmailEditingScreen from '@/screens/profile/EmailEditingScreen';
import PersonalDataEditingScreen from '@/screens/profile/PersonalDataEditingScreen';
import PhoneEditingConfirmationScreen from '@/screens/profile/PhoneEditingConfirmationScreen';
import PhoneEditingScreen from '@/screens/profile/PhoneEditingScreen';
import ProfileScreen from '@/screens/tabs/ProfileScreen';

export enum ProfileScreenName {
  Profile = 'Profile',
  BankDetails = 'BankDetails',
  EmailEditing = 'EmailEditing',
  PhoneEditing = 'PhoneEditing',
  PersonalDataEditing = 'PersonalDataEditing',
  PhoneEditingConfirmation = 'PhoneEditingConfirmation',
}
export type ProfileStackParamList = {
  [ProfileScreenName.Profile]: undefined;
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
  </Stack.Navigator>
);
