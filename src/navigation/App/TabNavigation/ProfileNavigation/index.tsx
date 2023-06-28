import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import EmailEditingScreen from '@/screens/tabs/EmailEditingScreen';
import PersonalDataEditingScreen from '@/screens/tabs/PersonalDataEditingScreen';
import PhoneEditingConfirmationScreen from '@/screens/tabs/PhoneEditingConfirmationScreen';
import PhoneEditingScreen from '@/screens/tabs/PhoneEditingScreen';
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
  </Stack.Navigator>
);

export default ProfileNavigation;
