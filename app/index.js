/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import firebase, { RemoteMessage } from 'react-native-firebase';
const handleFCMNotification = async (message: RemoteMessage) => {
  console.log('FCM OFFLINE: ', message);
  return Promise.resolve();
}
AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => PushNotificationService.handleFCMNotification);
