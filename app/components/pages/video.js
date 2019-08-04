import React,{Component} from "react";
import { View,ToastAndroid, Text,ActivityIndicator,Dimensions,Image,NetInfo,Animated,ImageBackground,TouchableOpacity ,Alert} from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
const {width, height} = Dimensions.get('window');
import ShareItem from '../utils/ShareItem';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from 'react-native-firebase';
import IconShare from 'react-native-vector-icons/Entypo';
import Share, {ShareSheet, Button} from 'react-native-share';
import { AndroidBackHandler } from 'react-navigation-backhandler';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import normalize from '../utils/normalize'
import WebView from 'react-native-android-fullscreen-webview-video';
import {
    CachedImage,
    ImageCacheProvider,
    ImageCacheManager
} from 'react-native-cached-images'
import Time from '../utils/Time'
export default class Video extends Component {
  static navigationOptions = {
   title: 'Article',
 };
  constructor(props){
    super(props);
    const { navigation } = this.props;
    const { id } =  navigation.getParam('link');
    let link="";
    console.log(navigation);
  if(id!=undefined){
      link="http://news119.herokuapp.com/findVideo/"+id;
  }
  else{
      link="http://news119.herokuapp.com/findVideo/"+this.props.navigation.state.params.link;
  }


    this.state ={ isLoading: "true",params:link,dataSource:{},img:''};

  }
  onBackButtonPressAndroid = () => {
       this.props.navigation.navigate('Home');
     return false;
   };
  componentDidMount(){
    const { navigation } = this.props;
      const { id } =  navigation.getParam('link');
    this.setState({id:id});
    NetInfo.isConnected.fetch().done((isConnected) => {

      if(isConnected == true)
      {
        return fetch(this.state.params)
          .then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson)

            this.setState({
              url:responseJson.data.url,
              isLoading: false,
              dataSource: responseJson.data,
              title:responseJson.data.title,
              _id:responseJson.data._id,
              ytid:this.YouTubeGetID(responseJson.data.url)

            }, function(){

            });

          })
          .catch((error) =>{
            console.error(error);
          });
      }
      else
      {
        Alert.alert(
            'Network Connection',
            'No Internet Please Try Again Later',
            [
             {text: 'OK', onPress: () =>   this.props.navigation.goBack()},
            ],
            )

      }

    });


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
    console.log(this.state.params,"LINK");
    console.log(this.props.navigation.state.params.link,"LINKSS");


      if(this.state.isLoading){
            return(
              <View >
              <CachedImage  source={require('../images/load.gif')}    style={{left:wp('1%') ,width: wp('100'), height: hp('100')}}/>
              </View>
            )
          }
        var item=this.state.dataSource;



              return(
                <View>

                <Icon2  name="close-circle" size={normalize(28)} color="black" style={{ shadowColor: 'red',
                shadowOpacity: 0.5,shadowRadius: 5,shadowOffset: {width: 0 , height: 1, }, position: 'absolute',alignSelf:'flex-end',right:normalize(5),top:normalize(3)}}
                onPress={() => { this.props.navigation.goBack()}}/>

                   <View style={{height:hp('80%'),marginTop: normalize(30),borderRadius:normalize(5),backgroundColor:'white'}}>

                   <WebView
                      style={{marginTop: normalize(0)}}
                      domStorageEnabled={true}
                      source={{uri: 'https://www.youtube.com/embed/'+this.state.ytid }}
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
  top: hp('84%'),
   right:  wp('32%'),
   },
   shareWhatsapp:{
       alignItems: 'center',
     zIndex:1,
     position: 'absolute',
      top: hp('84%'),
   right: wp('53%'),
   },
  };
