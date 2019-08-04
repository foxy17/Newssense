import React,{Component} from "react";
import { View, Text,ActivityIndicator,StatusBar,
FlatList,Image,ToastAndroid,Dimensions,Animated,Alert,ScrollView ,NetInfo ,Platform, PixelRatio,TouchableHighlight,Modal ,RefreshControl,PanResponder,TouchableOpacity,TouchableWithoutFeedback,ImageBackground  } from "react-native";
import { createStackNavigator,StackActions,NavigationActions, createAppContainer } from "react-navigation";
const {width, height} = Dimensions.get('window');
const diagonal=(height/width)/100;
import normalize from '../utils/normalize'
import ShareVideo from '../utils/ShareVideo'
import Time from '../utils/Time'
import SettingButton from '../utils/settings'
import checkPointer from '../utils/checkPointer';
import AsyncStorage from '@react-native-community/async-storage';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Share, {ShareSheet, Button} from 'react-native-share';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

import IconShare from 'react-native-vector-icons/Entypo';
import Toast from 'react-native-simple-toast';
import en from 'javascript-time-ago/locale/en'
import BackgroundTimer from 'react-native-background-timer';
import Carousel , { Pagination } from 'react-native-snap-carousel';
import ActionButton from 'react-native-action-button';
import WebView from 'react-native-android-fullscreen-webview-video';
import { Thumbnail } from 'react-native-thumbnail-video';

// import NetInfo from "@react-native-community/netinfo";
import firebase from 'react-native-firebase';
import {
    CachedImage,
    ImageCacheProvider,
    ImageCacheManager
} from 'react-native-cached-images'
const defaultImageCacheManager = ImageCacheManager();
export default  class VideoScreen extends Component {
  static navigationOptions = {
   title: 'Home',
 };
  constructor(props){
    super(props);


    this.state ={ isLoading: true,modalVisible: false,rate: 1,

    };
  }

componentWillUnmount() {


    NetInfo.isConnected.removeEventListener(
        'connectionChange',
        this._handleConnectivityChange

    );

  }
async componentDidMount(){
  NetInfo.isConnected.addEventListener(
      'connectionChange',
      this._handleConnectivityChange

  );

  NetInfo.isConnected.fetch().done((isConnected) => {

    if(isConnected == true)
    {
      this.setState({connection_Status : "Online"})
    }
    else
    {
      this.setState({connection_Status : "Offline"})
    }

  });


  const data = await AsyncStorage.getItem('Video')

  if(data!=null) {
    var length;
    if(this.state.connection_Status=="Online"){
      await fetch('https://news119.herokuapp.com/getLength/video')
        .then((response) => response.json()).then((responseJson) => {
            length=responseJson.length;
            }
          )
          var wide=await AsyncStorage.getItem('lengthVideo');
          wide=parseInt(wide);
          var diff=length-wide;
          if(wide==null){
            this.getData();
          }
          else if(diff>20){
            Toast.show(diff+' New Video Added,Refreshing your feed');
            this.getData();
          }
          else{
              this.setState({

                isLoading: false,
                data: JSON.parse(data),
          })}
        }
        else{
          Alert.alert(
              'Network Connection',
              'No Internet Please Try Again Later',
              [
               {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
              )
              this.setState({

                isLoading: false,
                data: JSON.parse(data),
          })
        }
   }
    else {
      this.getData();
    }
}
  _handleConnectivityChange = (isConnected) => {

      if(isConnected == true)
        {
          this.setState({connection_Status : "Online"})
        }
        else
        {
          this.setState({connection_Status : "Offline"})
        }
    };


  async getData(){

    if(this.state.connection_Status=="Online")
    {
    const component = this
    this.setState({isLoading: true})
    var wasServerTimeout = false;
    var timeout=setTimeout(() => {
      wasServerTimeout = true;

    } , 20000)
    fetch('https://news119.herokuapp.com/getVideo')
      .then((response) => response.json()).then((responseJson) => {
        console.log(wasServerTimeout);
        if(wasServerTimeout==false){
          clearTimeout(timeout);
          console.log(responseJson.data.length);
        this.setState({
          length:responseJson.length,
          loaded:true,
          data: responseJson.data.sort((a,b)=>a.publishDate<b.publishDate),
        }, async function(){
            console.log("Get Data",this.state.length)
            this.setState({isLoading:false});
            const oldLen = await AsyncStorage.getItem('lengthVideo');
            console.log(oldLen)
              Toast.show('Refreshed');
              if (oldLen == undefined){
                await AsyncStorage.setItem('lengthVideo',String(this.state.length))
              }
              else{
                var wide=parseInt(oldLen);
                var diff=this.state.length-wide;
                if(diff<=0){
                    Toast.show('Your Feed Is Up To Date ');
                }
                else if(diff>0){
                  Toast.show('New Video Added '+diff);
                   await AsyncStorage.setItem('lengthVideo',String(this.state.length))
                }
              }
          AsyncStorage.setItem('Video',JSON.stringify(this.state.data))
          });
        }
        else{
          console.log(wasServerTimeout);
          Alert.alert(
              'Network Timeout',
              'Slow internet or no connection please close the app and try again',
              [
               {text: 'OK'},
              ],
              )

      }

      })
      .catch((error) =>{
        console.log(error);
           clearTimeout(timeout);


      });
    }
    else{
  this.setState({isLoading: true,random:0})

  await AsyncStorage.setItem('POINTER', '0');
  this.setState({isLoading: false})
  Alert.alert(
      'Network Connection',
      'No Internet Please Try Again Later',
      [
       {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      )
    }
  }
  setModalVisible(visible) {
      this.setState({modalVisible: visible});
      console.log("Visivle")
    }


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
       ).social.setTitle(this.state.title).android.setPackageName('com.newSense');
       console.log(dm);

       firebase.links()
 .createShortDynamicLink(dm, 'SHORT')
 .then((url) => {
   let shareOptions = {
     title: "Share This Story",
     message: "Checkout this video:"+"\n"+this.state.title+"\n",
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
      message: "Checkout this video:"+"\n"+this.state.title+"\n",
      url: url,
      subject: "Share Link",
      social: Share.Social.WHATSAPP
    };

   Share.shareSingle(shareOptions);

  });

  }
//render
_keyExtractor = (item, index) => item._id;

_renderItem ({item, index}) {
  return(
    <View style={styles.inner}>
      <Text  style={styles.titleText} >{item.title}﻿</Text>
        <View>
           <Thumbnail url={item.url} onPress={()=>this.props.navigation.navigate({routeName: 'SingleVideo', params:{id:item._id,link:item.url,title:item.title}}) }
           showPlayIcon={false} iconStyle={{borderRadius:20}} containerStyle={{borderRadius:normalize(20)}} imageWidth={wp('93%')} imageHeight={hp('25%')} />
        </View>
      <View style={{flex:3}}>
        <ShareVideo id={item._id} name={item.title} />
      <Text onPress={()=> this.setState({modalVisible: true})} style={{marginTop:normalize(2),fontSize:normalize(15),color:'#afafaf'}}>by- {item.source}</Text>
    </View>
  </View>

  )
}
renderLoadingView() {
    return (
          <View   style={{top:30,height:hp('30%')}}>
        <ActivityIndicator

           color = '#bc2b78'
           size = "large"

        />
        </View>
    );
  }

  render(){

      if(this.state.isLoading ){
            return(
              <View >
                <ActivityIndicator />
              </View>
            )}



      return(

      <View style={{flex:1}}>
      <SettingButton navigate={this.props.navigation.navigate} parentMethod={this.getData.bind(this)} button={"Video"}  />
      <Modal
           animationType="fade"
           transparent={false}
           visible={this.state.modalVisible}
           onRequestClose={() => {this.setModalVisible(!this.state.modalVisible)}}
          >

          <View style={{height:hp('50%'),marginTop: normalize(50),borderRadius:normalize(5),backgroundColor:'white'}}>
          <Icon2  name="close-circle" size={normalize(28)} color="black" style={{ shadowColor: 'red',
          shadowOpacity: 0.5,shadowRadius: 5,shadowOffset: {width: 0 , height: 1, }, position: 'absolute',alignSelf:'flex-end',right:normalize(5),top:normalize(3)}}
          onPress={() => { this.setModalVisible(!this.state.modalVisible)}}/>

             <View style={{height:hp('50%'),marginTop: normalize(30),borderRadius:normalize(5),backgroundColor:'white'}}>

             <WebView
                style={{marginTop: normalize(10),height:normalize(100)}}
                domStorageEnabled={true}
                source={{uri: 'https://www.youtube.com/embed/'+this.state.ytid+'?&fullscreen=1 ' }}
                startInLoadingState={true}
                renderLoading={this.renderLoadingView}
                    />
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



      </Modal>
       <StatusBar backgroundColor="black" animated />
       <View style={{marginTop:normalize(40)}}>
       <FlatList
        data={this.state.data}

        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem.bind(this)}
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
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    inner: {
      flex: 1,
      padding:6,
      marginLeft:wp('2%'),
      marginRight:wp('4%'),
      marginBottom:normalize(20)

    },
    text: {
      flex:1,
      color: '#fff',
      fontSize: wp('8%'),
      fontWeight: 'bold',

    },
    body: {

      color: '#545454',
      // fontSize:normalize(780)*diagonal,
      fontSize:normalize(15),
      flexShrink:1,
      textAlign: 'justify',



    },

  titleArrtibute:{
      color:'#679CEA',
      top:0,
      fontSize:normalize(17),

      fontWeight: 'bold',
  }
,
  titleText: {
    color:'#222',
    top:5,
   fontSize:normalize(17),

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
  },
  fullScreen: {
   position: 'absolute',
   top: 0,
   left: 0,
   bottom: 0,
   right: 0,
 },

   shareButton:{
      alignItems: 'center',
     position:'absolute',
     zIndex:1,
  top: normalize(250),
   right:  wp('32%'),
   },
   shareWhatsapp:{
       alignItems: 'center',
     zIndex:1,
     position: 'absolute',
      top: normalize(250),
   right: wp('47%'),
   },
  };
