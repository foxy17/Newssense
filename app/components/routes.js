import React from "react";
import { View, Text ,Platform,Linking } from "react-native";
import checkIfFirstLaunch from './utils/init';
import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from './pages/home';
import DetailsScreen from './pages/detail';
import DeepLinking from 'react-native-deep-linking';
import {AppContainer , AppContainerIntro} from './navigator';

export default class Routes extends React.Component {
  constructor(props) {
     super(props);

     this.state = {
       isFirstLaunch: false,
       hasCheckedAsyncStorage: false,
       response: {}
     };
   }


   componentDidMount() {
     var url = Linking.getInitialURL().then((url) => {
     if (url) {
           Linking.openURL(url);
         }
       }).catch(err => console.error('An error occurred', err));

     DeepLinking.addScheme('example://');
     Linking.addEventListener('url', this.handleUrl);

     DeepLinking.addRoute('/test', (response) => {
       // example://test
       this.setState({ response });
     });

     DeepLinking.addRoute('/test/:id', (response) => {
       // example://test/23
       this.props.navigation.navigate('Article',{id:response});
     });

     DeepLinking.addRoute('/test/:id/details', (response) => {
       // example://test/100/details
       this.setState({ response });
     });

     Linking.getInitialURL().then((url) => {
       if (url) {
         Linking.openURL(url);
       }
     }).catch(err => console.error('An error occurred', err));
   }

   componentWillUnmount() {
     Linking.removeEventListener('url', this.handleUrl);
   }

   handleUrl = ({ url }) => {
     Linking.canOpenURL(url).then((supported) => {
       if (supported) {
         DeepLinking.evaluateUrl(url);
       }
     });
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
