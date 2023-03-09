import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import SignUpScreen from '../../screens/auth/SignUpScreen';

const Stack = createStackNavigator();

function AuthNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
    </Stack.Navigator>
  );
}

export default AuthNavigation;
