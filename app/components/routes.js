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
   async createNotificationListeners() {
  /*
  * Triggered when a particular notification has been received in foreground
  * */
  const channel = new firebase.notifications.Android.Channel('test-channel', 'Test Channel', firebase.notifications.Android.Importance.Max)
  .setDescription('My apps test channel');
  firebase.notifications().android.createChannel(channel);
  this.notificationListener = firebase.notifications().onNotification((notification) => {
      const { title, body } = notification;
      firebase.notifications().displayNotification(notification);
      this.setState({ notif:notification})
    console.log(notification);
      this.showAlert(title, body);
  });

  /*
  * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
  * */
  this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
      const { title, body } = notificationOpen.notification;
        const notif: Notification = notificationOpen.notification;
        this.setState({ notif:notif});
        console.log("data",notif.data);
        this.props.navigation.navigate('Settings');
    this.setState({ notif:notificationOpen.notification})
      this.showAlert(title, body);
  });

  /*
  * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
  * */
  const notificationOpen = await firebase.notifications().getInitialNotification();
  if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      this.setState({ notif:notificationOpen.notification})
      this.props.navigation.navigate('Settings');
    console.log(notification);
      this.showAlert(title, body);
  }
//   const notificationOpen: NotificationOpen = await firebase.notifications().getInitialNotification();
//       if (notificationOpen) {
//           const action = notificationOpen.action;
//           const notification: Notification = notificationOpen.notification;
//
//           var seen = [];
//           alert(JSON.stringify(notification.data, function(key, val) {
//               if (val != null && typeof val == "object") {
//                   if (seen.indexOf(val) >= 0) {
//                       return;
//                   }
//                   seen.push(val);
//               }
//               return val;
//           }));
//             console.log('opened',seen);
//       }
//       const channel = new firebase.notifications.Android.Channel('test-channel', 'Test Channel', firebase.notifications.Android.Importance.Max)
//         .setDescription('My apps test channel');
//     // Create the channel
//     firebase.notifications().android.createChannel(channel);
//     this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification: Notification) => {
//         // Process your notification as required
//         // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
//     });
//     this.notificationListener = firebase.notifications().onNotification((notification: Notification) => {
//         // Process your notification as required
//         notification
//             .android.setChannelId('test-channel')
//             .android.setSmallIcon('ic_launcher');
//         firebase.notifications()
//             .displayNotification(notification);
//
//     });
//     this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
//         // Get the action triggered by the notification being opened
//         const action = notificationOpen.action;
//         // Get information about the notification that was opened
//         const notification: Notification = notificationOpen.notification;
//         var seen = [];
//         console.log('opened',JSON.stringify(notification.data));
//          this.props.navigation.navigate('Article',{id:notification.data._id});
//         alert(JSON.stringify(notification.data, function(key, val) {
//             if (val != null && typeof val == "object") {
//                 if (seen.indexOf(val) >= 0) {
//                     return;
//                 }
//                 seen.push(val);
//             }
//             return val;
//         }));
//         firebase.notifications().removeDeliveredNotification(notification.notificationId);
// });
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
      alert('Initial Notification');
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
    notification.android.setChannelId('test-channel');
    firebase.notifications().displayNotification(notification).catch(err => {console.log(err); alert("Error On Notification")});
    this.setState({ notif:notification})
  console.log(notification);

});
firebase.messaging().getToken().then(token => {
console.log("GCM Token====>>>>>>>>",token);
 AsyncStorage.setItem('fcmToken', token);});

     Linking.addEventListener('url', this.handleUrl);
     DeepLinking.addScheme('https://');
    DeepLinking.addRoute('news.newssense.co/:id', (response) => {
      console.log("ID",response);


    });
     const nav=this
     const unsubscribe = firebase.links().onLink((url) => {
        console.log("inital line",url);
        DeepLinking.evaluateUrl(url);
             this.props.navigation.navigate('Article',{link:response});
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
