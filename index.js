import { AppRegistry, LogBox } from 'react-native';

import App from '@/core/App';

import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);

LogBox.ignoreLogs(['Sending']);
