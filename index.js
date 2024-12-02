/**
 * @format
 */
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
messaging().onMessage((data) => {
    console.log(data);
    notifee.displayNotification(data.notification);
})
AppRegistry.registerComponent(appName, () => App);
