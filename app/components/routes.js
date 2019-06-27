import React from "react";
import { View, Text ,Platform,Linking } from "react-native";
import checkIfFirstLaunch from './utils/init';
import { createStackNavigator, createAppContainer,NavigationActions } from "react-navigation";
import DeepLinking from 'react-native-deep-linking';
import store from './redux/Store';
import {AppContainer , AppContainerIntro} from './navigator';
import { AsyncStorage } from 'react-native';
import firebase, { Notification, RemoteMessage, NotificationOpen } from 'react-native-firebase';
import { logger } from 'react-native-logger'
import { Provider } from 'react-redux';
import { apiMiddleware, reducer } from './redux/redux';
export default class Routes extends React.Component {
  constructor(props) {
     super(props);

     this.state = {
       isFirstLaunch: false,
       hasCheckedAsyncStorage: false,
       response: {}
     };
   }


showAlert(title, body) {

  Alert.alert(
    title, body,
    [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
    ],
    { cancelable: false },
  );
}

   async componentDidMount() {
     this.checkPermission();
      // this.createNotificationListeners();
  }

  //1
 async checkPermission() {
   const enabled = await firebase.messaging().hasPermission();
   if (enabled) {
       this.getToken();
   } else {
       this.requestPermission();
   }
}

 //3
 async getToken() {
   let fcmToken = await AsyncStorage.getItem('fcmToken');
   if (!fcmToken) {
     fcmToken = await firebase.messaging().getToken();
     if (fcmToken) {
         // user has a device token
         await AsyncStorage.setItem('fcmToken', fcmToken);
     }
 }
}

 //2
   async requestPermission() {
     try {
         await firebase.messaging().requestPermission();
         // User has authorised
         this.getToken();
     } catch (error) {
         // User has rejected permissions
         console.log('permission rejected');
     }
   }
   componentDidMount() {

 this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
    console.log(notificationOpen,"Opened listener");
    console.log(notificationOpen.notification._data.type,"notificationOpen");
    firebase.notifications().removeDeliveredNotification(notificationOpen.notification._notificationId)
    });
    firebase.notifications().getInitialNotification()
  .then((notificationOpen: NotificationOpen) => {
    if (notificationOpen) {

      console.log(notificationOpen,"notificationOpen");
      console.log(notificationOpen.notification._data.type,"notificationOpen");
      firebase.notifications().removeDeliveredNotification(notificationOpen.notification._notificationId)
    }
});
const channel = new firebase.notifications.Android.Channel('test-channel', 'test-channel', firebase.notifications.Android.Importance.Max)
.setDescription('My apps test channel');
firebase.notifications().android.createChannel(channel);
this.notificationListener = firebase.notifications().onNotification((notification) => {
    const { title, body } = notification;
    const localNotification = new firebase.notifications.Notification()
                    .setNotificationId(notification.notificationId)
                    .setTitle(title)
                    .android.setChannelId('test-channel')
                    .android.setSmallIcon('ic_icon')
                    .android.setLargeIcon('ic_launcher')
                    .android.setShowWhen(true)
                    .android.setBigText(body)
                    .android.setColor('#2089FF')
                    .setBody(body);

    firebase.notifications().displayNotification(localNotification).catch(err => {console.log(err); alert("Error On Notification")});

  console.log(notification);

});
firebase.messaging().getToken().then(token => {
console.log("GCM Token====>>>>>>>>",token);
 AsyncStorage.setItem('fcmToken', token);});

     Linking.addEventListener('url', this.handleUrl);
     DeepLinking.addScheme('https://');
    DeepLinking.addRoute('news.newssense.co/:id', (response) => {
      console.log("ID response",response.id);
      this.props.navigation.navigate('Article',{link:response});


    });
     const nav=this
     const unsubscribe = firebase.links().onLink((url) => {
        console.log("inital line",url);
        DeepLinking.evaluateUrl(url);

      });

     firebase.links()
    .getInitialLink()
    .then((url) => {
        if (url) {
          DeepLinking.evaluateUrl(url);

        } else {
           // app NOT opened from a url
        }
    });





   }

   componentWillUnmount() {
     // this.notificationListener();
     // this.notificationOpenedListener();
     this.notificationDisplayedListener();
       this.notificationListener();
       this.notificationOpenedListener();

     try {
    unsubscribe();
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
     console.log("HEYA",this.state.notif)
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
