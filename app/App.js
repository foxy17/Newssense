import React,{Component} from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  FlatList,Image,Platform
} from 'react-native';
import { createStackNavigator, createAppContainer, SafeAreaView } from "react-navigation";


import ExternalScreen from './components/pages/external';
import Routes from './components/routes'

const AppNavigator = createStackNavigator({
  Routes: { screen: Routes },
  Article: { screen: ExternalScreen, path: 'news/:id', },
},
{
   initialRouteName: "Routes",
   headerMode: 'none'
 }
);
const prefix = Platform.OS == 'android' ? 'news://' : 'news://';
const App = createAppContainer(AppNavigator)
const MainApp = () => <App uriPrefix={prefix} />;
export default MainApp;
