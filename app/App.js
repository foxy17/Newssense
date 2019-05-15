import React,{Component} from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  FlatList,Image,
} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import Swiper from 'react-native-swiper-animated';


import Routes from './components/routes'

export default class AwesomeComponent extends Component{

  render() {
    return (
         <Routes/>
         );


}
}
