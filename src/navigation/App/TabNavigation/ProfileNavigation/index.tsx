import { createStackNavigator } from '@react-navigation/stack';
import { ProfileScreen } from '../../../../screens';

const Stack = createStackNavigator();

function ProfileNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default ProfileNavigation;
