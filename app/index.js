/**
 * @format
 */
import BackgroundFetch from "react-native-background-fetch";
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import firebase, { RemoteMessage } from 'react-native-firebase';
const handleFCMNotification = async (message: RemoteMessage) => {
  console.log('FCM OFFLINE: ', message);
  return Promise.resolve();
}
let MyHeadlessTask = async () => {
  console.log('[BackgroundFetch HeadlessTask] start');


    const response = await fetch('http://dash.newssense.co/getData')
    let responseJson = await response.json();

    // Data persisted to AsyncStorage can later be accessed by the foreground app

      var apiD =responseJson.data.sort((a,b)=>a.publishDate<b.publishDate);
       await  AsyncStorage.setItem('ApiData',JSON.stringify(apiD));
       var lent=await AsyncStorage.getItem('length');
       lent=parseInt(lent);
       if(responseJson.data.length !=lent){
        await  AsyncStorage.setItem('POINTER', '0');
       }
  BackgroundFetch.finish();
}

// Register your BackgroundFetch HeadlessTask
BackgroundFetch.registerHeadlessTask(MyHeadlessTask);
AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => PushNotificationService.handleFCMNotification);
