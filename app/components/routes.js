import React from "react";
import { View, Text ,Platform,Linking } from "react-native";
import checkIfFirstLaunch from './utils/init';
import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from './pages/home';
import DetailsScreen from './pages/detail';
import DeepLinking from 'react-native-deep-linking';
import {AppContainer , AppContainerIntro} from './navigator';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { apiMiddleware, reducer } from './redux/redux';

// Create Redux store
const store = createStore(reducer, {}, applyMiddleware(apiMiddleware));

// Fetch movie data
store.dispatch({type: 'GET_DATA'});


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
     Linking.addEventListener('url', this.handleUrl);
     Linking.getInitialURL().then((url) => {
       if (url) {
         Linking.openURL(url);
       }
     }).catch(err => console.error('An error occurred', err));
     DeepLinking.addScheme('https://');


     DeepLinking.addRoute('news119.herokuapp.com/:id', (response) => {

       this.props.navigation.navigate('Article',{id:response});
     });


   }

   componentWillUnmount() {
     try {
       Linking.removeEventListener('url', this.handleUrl);
     } catch (e) {

     } finally {

     }
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

     if(isFirstLaunch)  {
       return(
       <Provider store={store}>
       <AppContainerIntro/>
        </Provider>
      )

     }
     else{
       return(
         <Provider store={store}>
         <AppContainer/>
         </Provider>
       )

     }

     ;
   }
}
