import { createStackNavigator } from '@react-navigation/stack';
import TaskCardScreen from '../../../../screens/tabs/TaskCardScreen';
import TaskSearchScreen from '../../../../screens/tabs/TaskSearchScreen';

const Stack = createStackNavigator();

function TaskSearchNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TaskSearchScreen"
        component={TaskSearchScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TaskCardScreen"
        component={TaskCardScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default TaskSearchNavigation;
