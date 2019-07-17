import React,{Component} from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  FlatList,Image,Platform
} from 'react-native';
import { createStackNavigator, createAppContainer, SafeAreaView } from "react-navigation";
import WebScreen from './components/pages/web';
import HomeScreen from './components/pages/home';
import ExternalScreen from './components/pages/external';
import Routes from './components/routes'

const AppNavigator = createStackNavigator({
  Routes: { screen: Routes },
  Article: { screen: ExternalScreen, path: 'news/:id', },
  Home:{screen:HomeScreen},
    Web:WebScreen,
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
