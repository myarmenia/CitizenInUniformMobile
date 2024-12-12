/**
 * @format
 */
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';

import { Alert, AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { updateFMCToken } from './src/api/requests';
import Toast from 'react-native-toast-message';


notifee.createChannel({
	id: 'silent',
	name: 'Silent mode',
	description: 'This is the default channel',
	importance: AndroidImportance.DEFAULT,
	sound: 'empty',
	vibration: true,
	// vibrationPattern: [200, 300, 200],
	sticky: true,
	enableVibration: true,
	showWhen: true,
})

notifee.createChannel({
	id: 'default',
	name: 'Default mode',
	description: 'This is the default channel',
	importance: AndroidImportance.DEFAULT,
	sound: '',
	vibration: true,
	// vibrationPattern: [200, 300, 200],
	sticky: true,
	enableVibration: true,
	showWhen: true,
})

// messaging().setBackgroundMessageHandler((remoteMessage) => {
// 	try {
// 		console.log('setBackgroundMessageHandler', remoteMessage);
// 	} catch (error) {
// 		console.log('Error while setting background message', error);
// 	}
// })


AppRegistry.registerComponent(appName, () => App);
