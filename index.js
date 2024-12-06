/**
 * @format
 */
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { updateFMCToken } from './src/api/requests';

messaging().onMessage(async (data) => {
	notifee.displayNotification({
		title: data.notification.title,
		body: data.notification.body,
		android: {
			channelId: 'default',
			importance: AndroidImportance.HIGH,
		}
	});
})

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
	try {

		const count = await notifee.getBadgeCount()
		  notifee.setBadgeCount(count + 1)

		console.log('setBackgroundMessageHandler', count);

	} catch (error) {
		console.log('Error while setting background message', error);

	}
})

notifee.onBackgroundEvent(async ({ type, detail }) => {
	console.log('onBackgroundEvent' ,  { type, detail });

});

notifee.onForegroundEvent(async ({ type, detail }) => {
	console.log('onForegroundEvent', { type, detail });


});
messaging().onTokenRefresh((token) => {
	console.log({ token });
	updateFMCToken(token);

})

AppRegistry.registerComponent(appName, () => App);
