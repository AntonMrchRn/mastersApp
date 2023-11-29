import { AppRegistry, LogBox } from 'react-native';
import { startNetworkLogging } from 'react-native-network-logger';

import App from '@/core/App';

import { name as appName } from './app.json';

startNetworkLogging();
AppRegistry.registerComponent(appName, () => App);
LogBox.ignoreLogs(['Sending']);
