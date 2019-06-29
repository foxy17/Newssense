import React from "react";
import { View, Text ,Platform,Linking } from "react-native";
import checkIfFirstLaunch from './utils/init';
import { createStackNavigator, createAppContainer,NavigationActions,StackActions } from "react-navigation";
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
     firebase.messaging().hasPermission()
  .then(enabled => {
    if (enabled) {
      console.log("user has permissions");
    } else {
      try {
     firebase.messaging().requestPermission();
          // User has authorised
      } catch (error) {
          // User has rejected permissions
      }
    }
  });
  this.messageListener = firebase.messaging().onMessage((message: RemoteMessage) => {
        // Process your message as required
    });


firebase.messaging().getToken().then(token => {
console.log("GCM Token====>>>>>>>>",token);
 AsyncStorage.setItem('fcmToken', token);});

     Linking.addEventListener('url', this.handleUrl);
     DeepLinking.addScheme('https://');
    DeepLinking.addRoute('news.newssense.co/:id', (response) => {
      console.log("ID response",response.id);
      try{
        const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'Article', params:{link:response}})],
        key: null,
      });
      this.props.navigation.dispatch(resetAction);
      }
      catch(e){
        console.log(e);
      }
      this.props.navigation.navigate('Article',{link:response});


    });
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
       var id=notificationOpen.notification._data.id;
       console.log(id,"Datastore");
           this.props.navigation.navigate('Article',{link:id});
         const resetAction = StackActions.reset({
         index: 0,
         actions: [NavigationActions.navigate({routeName: 'Article', params:{link:id}})],
         key: null,
       });
       this.props.navigation.dispatch(resetAction);

       firebase.notifications().removeDeliveredNotification(notificationOpen.notification._notificationId)
       });
       firebase.notifications().getInitialNotification()
     .then((notificationOpen: NotificationOpen) => {
       if (notificationOpen) {


         firebase.notifications().removeDeliveredNotification(notificationOpen.notification._notificationId)
       }
   });
   const channel = new firebase.notifications.Android.Channel('test-channel', 'test-channel', firebase.notifications.Android.Importance.Max)
   .setDescription('My apps test channel');
   firebase.notifications().android.createChannel(channel);
   this.notificationListener = firebase.notifications().onNotification((notification) => {
       const { title, body } = notification;
       var data=notification._data.key;


       const localNotification = new firebase.notifications.Notification()
                       .setNotificationId(notification.notificationId)
                       .setTitle(title)
                       .android.setChannelId('test-channel')
                       .android.setSmallIcon('ic_icon')
                       .android.setLargeIcon('ic_launcher')
                       .android.setShowWhen(true)
                       .android.setBigText(body)
                       .android.setColor('#2089FF')
                       .setData({id:data})
                       .setBody(body);

       firebase.notifications().displayNotification(localNotification).catch(err => {console.log(err); alert("Error On Notification")});

  

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
      this.messageListener();
       this.notificationListener();
       this.notificationOpenedListener();


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
