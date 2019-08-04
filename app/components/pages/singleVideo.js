import React,{Component} from "react";
import { View,ToastAndroid, Text,ActivityIndicator,Dimensions,Image,NetInfo,Animated,ImageBackground,TouchableOpacity ,Alert} from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
const {width, height} = Dimensions.get('window');
import ShareItem from '../utils/ShareItem';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from 'react-native-firebase';
import IconShare from 'react-native-vector-icons/Entypo';
import { AndroidBackHandler } from 'react-navigation-backhandler';
import Share, {ShareSheet, Button} from 'react-native-share';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import normalize from '../utils/normalize'
import WebView from 'react-native-android-fullscreen-webview-video';
import {
    CachedImage,
    ImageCacheProvider,
    ImageCacheManager
} from 'react-native-cached-images'
import Time from '../utils/Time'
export default class SingleVideo extends Component {
  static navigationOptions = {
   title: 'Article',
 };
  constructor(props){
    super(props);
    var { navigation } = this.props;
    var  id  =  this.props.navigation.state.params.id;
    var  link =  this.props.navigation.state.params.link;
    var name =this.props.navigation.state.params.title;
    console.log(id,link)
    this.state ={ isLoading: false,_id:id,dataSource:{},img:'',name:name,url:link};
    console.log(navigation)

  }
  onBackButtonPressAndroid = () => {
       this.props.navigation.navigate('Home');
     return false;
   };

  //Get youtube id
  YouTubeGetID(url){
  var ID = '';
  url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  if(url[2] !== undefined) {
    ID = url[2].split(/[^0-9a-z_\-]/i);
    ID = ID[0];
  }
  else {
    ID = url;
  }
    return ID;
}
  //ShareItem
  _onDone = () => {
    var id='https://video.newssense.co/'+this.state._id;
     ToastAndroid.show("Wait A Moment", ToastAndroid.SHORT);
    var dm = new firebase.links.DynamicLink(
             id,
           'https://video.newssense.co'
         ).social.setTitle(this.state.name).android.setPackageName('com.newSense');
         console.log(dm);

         firebase.links()
   .createShortDynamicLink(dm, 'SHORT')
   .then((url) => {
     let shareOptions = {
       title: "Share This Story",
       message: "Checkout this news:"+"\n"+this.state.name+"\n",
       url: url,
       subject: "Share Link"
     };
      Share.open(shareOptions).catch((err) => { err && console.log(err); });
   });
   }
    _onShare= () =>{
     var id='https://video.newssense.co/'+this.state._id;
      ToastAndroid.show("Opening Whatsapp", ToastAndroid.SHORT);
     var dm = new firebase.links.DynamicLink(
              id,
            'https://news.newssense.co'
          ).android.setPackageName('com.newSense');
          console.log(dm);
          firebase.links()
    .createShortDynamicLink(dm, 'SHORT')
    .then((url) => {
      let shareOptions = {
        title: "Share This Story",
        message: "Checkout this news:"+"\n"+this.state.name+"\n",
        url: url,
        subject: "Share Link",
        social: Share.Social.WHATSAPP
      };

     Share.shareSingle(shareOptions);

    });

    }

  //render
  renderLoadingView() {
      return (
            <View   >
          <ActivityIndicator
             color = '#bc2b78'
             size = "large"
          />
          </View>
      );
    }

  render() {
    const { navigation } = this.props;
    const { id } =  navigation.getParam('id');
    const { link } =  navigation.getParam('link');


      if(this.state.isLoading){
            return(
              <View >
              <ActivityIndicator/>
              </View>
            )
          }

              return(
                <View>

                <Icon2  name="close-circle" size={normalize(28)} color="black" style={{ shadowColor: 'red',
                shadowOpacity: 0.5,shadowRadius: 5,shadowOffset: {width: 0 , height: 1, }, position: 'absolute',alignSelf:'flex-end',right:normalize(5),top:normalize(3)}}
                onPress={() => { this.props.navigation.goBack()}}/>

                   <View style={{height:hp('60%'),marginTop: normalize(60),borderRadius:normalize(5),backgroundColor:'white'}}>

                   <WebView
                      style={{marginTop: normalize(0)}}
                      domStorageEnabled={true}
                      source={{uri: 'https://www.youtube.com/embed/'+this.YouTubeGetID(this.state.url) }}
                      startInLoadingState={true}
                      renderLoading={this.renderLoadingView}
                          />
                    <Text  style={styles.titleText} >{this.state.name}﻿</Text>
                    </View>
                    <View  style={styles.shareButton}><IconShare
                     raised
                     name='share'
                     type='entypo'
                     color='#000000'
                     size= {normalize(40)}
                     onPress={this._onDone}
                       />
                       </View>
                     <View style={styles.shareWhatsapp}><Icon2
                      raised
                      name='whatsapp'
                      type='material'
                      color='#25D366'
                      size= {normalize(40)}
                      onPress={this._onShare}

                    /></View>
                 </View>


        )
    }
}
 const styles = {
    image: {

      flex: 1,
      height:null,
      width:null,
      resizeMode:'cover',
      borderTopLeftRadius: 10,
    borderTopRightRadius: 10,

    },
    textwrap: {

            flexGrow: 1,
            flex: 1,
        },

    Imagebody: {
      flex: 2,
      backgroundColor:'black',
      borderRadius:10,
    },
    inner: {
      flex: 3,
      padding:6,
      marginLeft:1,
      marginRight:1

    },
    text: {
      flex:1,
      color: '#fff',
      fontSize: wp('8%'),
      fontWeight: 'bold',
    },
    body: {

      color: 'black',
      fontSize:normalize(15)


    },

  titleArrtibute:{
      color:'#679CEA',
      top:0,
      fontSize:normalize(14),

      fontWeight: 'bold',
  }
,
  titleText: {
    color:'black',
    top:5,
   fontSize:normalize(17),
   fontWeight: 'bold',
   marginLeft:5,
   marginRight:3,
   marginBottom:hp('2%')
 },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems:'center'
    },
    horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10
    },
    subView:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      backgroundColor:'transparent'
  } ,
  shareButton:{
      alignItems: 'center',
     position:'absolute',
     zIndex:1,
  top: hp('70%'),
   right:  wp('32%'),
   },
   shareWhatsapp:{
       alignItems: 'center',
     zIndex:1,
     position: 'absolute',
      top: hp('70%'),
   right: wp('53%'),
   },
  };
