import React from "react";
import { View, Text } from "react-native";
import checkIfFirstLaunch from './utils/init';
import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from './pages/home';
import DetailsScreen from './pages/detail';

import {AppContainer , AppContainerIntro} from './navigator';

export default class Routes extends React.Component {
  constructor(props) {
     super(props);

     this.state = {
       isFirstLaunch: false,
       hasCheckedAsyncStorage: false,
     };
   }

   async componentWillMount() {
     const isFirstLaunch = await checkIfFirstLaunch();
     this.setState({ isFirstLaunch, hasCheckedAsyncStorage: true });
   }

   render() {
     const { hasCheckedAsyncStorage, isFirstLaunch } = this.state;

     if (!hasCheckedAsyncStorage) {
       return null;
     }

     return isFirstLaunch ?
       <AppContainerIntro/> :
       <AppContainer/>
     ;
   }
}
