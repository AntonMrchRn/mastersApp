import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import BankDetailsScreen from '@/screens/profile/BankDetailsScreen';
import EmailEditingScreen from '@/screens/profile/EmailEditingScreen';
import PersonalDataEditingScreen from '@/screens/profile/PersonalDataEditingScreen';
import PhoneEditingConfirmationScreen from '@/screens/profile/PhoneEditingConfirmationScreen';
import PhoneEditingScreen from '@/screens/profile/PhoneEditingScreen';
import ProfileScreen from '@/screens/tabs/ProfileScreen';
import {
  ProfileNavigationParamList,
  ProfileNavigatorScreenName,
} from '@/types/navigation';

const screenOptions = { headerShown: false };
const Stack = createStackNavigator<ProfileNavigationParamList>();

const ProfileNavigation = () => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen
      name={ProfileNavigatorScreenName.Profile}
      component={ProfileScreen}
    />
    <Stack.Screen
      name={ProfileNavigatorScreenName.EmailEditing}
      component={EmailEditingScreen}
    />
    <Stack.Screen
      name={ProfileNavigatorScreenName.PhoneEditing}
      component={PhoneEditingScreen}
    />
    <Stack.Screen
      name={ProfileNavigatorScreenName.PhoneEditingConfirmation}
      component={PhoneEditingConfirmationScreen}
    />
    <Stack.Screen
      name={ProfileNavigatorScreenName.PersonalDataEditing}
      component={PersonalDataEditingScreen}
    />
    <Stack.Screen
      name={ProfileNavigatorScreenName.BankDetails}
      component={BankDetailsScreen}
    />
  </Stack.Navigator>
);

export default ProfileNavigation;
