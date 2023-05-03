import { createStackNavigator } from '@react-navigation/stack';
import MyTasksScreen from '../../../../screens/tabs/MyTasksScreen';

const Stack = createStackNavigator();

function MyTasksNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyTasksScreen"
        component={MyTasksScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default MyTasksNavigation;
