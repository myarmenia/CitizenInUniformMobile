/**
 * @format
 */
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';

import { Alert, AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { updateFMCToken } from './src/api/requests';

messaging().app


messaging().onMessage(async (data) => {
	Alert.alert(
		data.notification.title,
		data.notification.body
	)
})

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
	try {		
		notifee.displayNotification({
			title: remoteMessage.notification.title,
			body: remoteMessage.notification.body,
			android: {
				channelId: 'default',
				importance: AndroidImportance.HIGH,
				sound: null
			}
		});
		console.log('setBackgroundMessageHandler', remoteMessage);

	} catch (error) {
		console.log('Error while setting background message', error);
	}
})

AppRegistry.registerComponent(appName, () => App);
