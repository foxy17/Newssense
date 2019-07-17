/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import BackgroundFetch from "react-native-background-fetch";

let MyHeadlessTask = async () => {
   console.log('[BackgroundFetch HeadlessTask] start');

  
  let response = await fetch('https://facebook.github.io/react-native/movies.json%27');
  let responseJson = await response.json();
  console.log('[BackgroundFetch HeadlessTask response: ', responseJson);

  BackgroundFetch.finish();
}

// Register your BackgroundFetch HeadlessTask
BackgroundFetch.registerHeadlessTask(MyHeadlessTask);
AppRegistry.registerComponent(appName, () => App);
