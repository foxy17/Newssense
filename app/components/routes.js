import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from './pages/home';
import DetailsScreen from './pages/detail';

import AppContainer from './navigator';

export default class Routes extends React.Component {
  render() {
    return <AppContainer />;
  }
}
