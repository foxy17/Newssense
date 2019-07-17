import React,{Component} from "react";
import { View, Text,ActivityIndicator,StatusBar,
FlatList,Image,Dimensions,Animated,Alert,ScrollView ,NetInfo ,Platform, PixelRatio,TouchableHighlight,Modal ,RefreshControl,PanResponder,TouchableOpacity,TouchableWithoutFeedback,ImageBackground  } from "react-native";
import { createStackNavigator,StackActions,NavigationActions, createAppContainer } from "react-navigation";
const {width, height} = Dimensions.get('window');
const diagonal=(height/width)/100;
import normalize from '../utils/normalize'
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
import DeepLinking from 'react-native-deep-linking';
import ShareItem from '../utils/ShareItem'
import Time from '../utils/Time'
import SettingButton from '../utils/settings'
import {connect} from 'react-redux';
import checkPointer from '../utils/checkPointer';
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import AsyncStorage from '@react-native-community/async-storage';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Share, {ShareSheet, Button} from 'react-native-share';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Toast from 'react-native-simple-toast';
import en from 'javascript-time-ago/locale/en'

import Carousel , { Pagination } from 'react-native-snap-carousel';

import firebase from 'react-native-firebase';
import {
    CachedImage,
    ImageCacheProvider,
    ImageCacheManager
} from 'react-native-cached-images'
const defaultImageCacheManager = ImageCacheManager();
import EStyleSheet from 'react-native-extended-stylesheet';


export default  class HomeScreen extends Component {
  static navigationOptions = {
   title: 'Home',
 };
  constructor(props){
    super(props);


    this.state ={ isLoading: true,len:"false",views:0,Pointer:0,hasPointer:true
    ,currentIndex:5,connection_Status : "", modalVisible: false,random:0,
    pan: new Animated.ValueXY(0),
    swiped_pan: new Animated.ValueXY({x:-width,y:0}),
    };

    }


async componentWillMount() {

  const has = await checkPointer();

  this.state.currentIndex=has;
  this.setState({ hasPointer:false, random: parseInt(has) });

}

 async  preload(data){
   var wasServerTimeout = false;

   var timeout=setTimeout(() => {
     wasServerTimeout = true;

   } , 10000)
   var len;
   const has = await checkPointer();
   if(data.length<3){len=data.length}
   else {len=3}

    for(let i=parseInt(has);i<3;i++){
      var item=data[i];

      var response=await defaultImageCacheManager.downloadAndCacheUrl(item.img.data);
      if(wasServerTimeout){
          clearTimeout(timeout);
        Alert.alert(
            'Network Timeout',
            'Slow internet this may take some time or close your app and try again',
            [
             {text: 'OK'},
            ],
          );

          break;
      }

    }

  }
  clearCache() {
          defaultImageCacheManager.clearCache()
              .then(() => {
                  console.log('Cache cleared');
              });
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

    const data = await AsyncStorage.getItem('ApiData')
    this.state.len="false";
    if(data!=null) {
      try{

        this.setState({
          len:"false",
          isLoading: false,
          loaded:true,
          dataSource: JSON.parse(data),

        })
      }catch(e) {
        console.warn("fetch Error: ", error)
     }}
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


componentWillReceiveProps(nextProps){
  console.log("PRops redcvied")
}
  async getData(){

    if(this.state.connection_Status=="Online")
    {
    const component = this
    AsyncStorage.setItem('POINTER', '0');
    this.setState({isLoading: true})
    var wasServerTimeout = false;

    var timeout=setTimeout(() => {
      wasServerTimeout = true;

    } , 20000)
    fetch('https://news119.herokuapp.com/getData')
      .then((response) => response.json()).then((responseJson) => {

        console.log(wasServerTimeout);
        if(wasServerTimeout==false){
          clearTimeout(timeout);
          console.log(responseJson.data.length);
        this.setState({
         length:responseJson.data.length,
          loaded:true,
          random:0,

          dataSource: responseJson.data.sort((a,b)=>a.publishDate<b.publishDate),
        }, async function(){
            console.log("TRIGGER")
          var id=parseInt(await AsyncStorage.getItem('id'));

          if(id){

            var index = this.state.dataSource.findIndex(function(item, i){
            return item._id === id
          });
           this.state.random=index
        }
            await component.preload(responseJson.data)
            this.setState({isLoading:false});
            const oldLen = await AsyncStorage.getItem('length');
            console.log(oldLen)
              Toast.show('Refreshed');
              if (oldLen == undefined){
                  AsyncStorage.setItem('length',String(this.state.length))
              }
              else{
                var wide=await AsyncStorage.getItem('length');
                console.log("OLD",wide)
                wide=parseInt(wide);
                var diff=this.state.length-wide;
                if(diff==0){
                      Toast.show("No New Articles");
                }
                else{
                  Toast.show('New Articles Added '+diff);
                   await AsyncStorage.setItem('length',String(this.state.length))
                }
                console.log("diffrecne",diff)

              }


          AsyncStorage.setItem('ApiData',JSON.stringify(this.state.dataSource))


          });
        }
        else{
          console.log(wasServerTimeout);
          Alert.alert(
              'Network Timeout',
              'Slow internet or no connection please close the app and try again',
              [
               {text: 'OK', onPress: () => this.getData()},
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
  }
  setUrl(visible) {
    this.setState({url: this.state.dataSource[visible].url});
  }
  _renderItem ({item, index}) {

    if(item.special)
        {
          return(

          <View>

                <CachedImage  source={{ uri:item.img.data }}
                 imageStyle={{ borderRadius: 10 }} style={{marginTop:normalize(40),flex: 1,position:'absolute',height:height-(height*0.14),width:width-(width*0.05),
                 borderRadius:50,margin:wp('3%'),shadowColor: '#003182',shadowOffset: { width: 0, height: 9 },shadowOpacity: 0.48,shadowRadius: 11.95,elevation:18}}>
                <TouchableOpacity activeOpacity={1} style={{height:height-(height*0.14),width:width-(width*0.05)}}  onPress={()=>{
                  var idshort='https://news.newssense.co/'+item._id;
                  var dm = new firebase.links.DynamicLink(
                           idshort,
                         'https://news.newssense.co'
                       ).android.setPackageName('com.newSense').social.setImageUrl(item.img.data).social.setTitle(item.title);


                  firebase.links()
                 .createShortDynamicLink(dm, 'SHORT')
                 .then((url) => {
                   let shareOptions = {
                     title: "Share This Story",
                     message: "Read This Awsome Article: "+item.title,
                     url: url,
                     subject: "Share Link"
                   };
                    Share.open(shareOptions).catch((err) => { err && console.log(err); });
               })}}
                >
                    <Text>  </Text>
                  </TouchableOpacity>
                </CachedImage>
          </View>



          )
        }
        else {

              return(


                <View >

                  <View style={{ marginTop:normalize(40),flex: 1,position:'absolute',height:height-(height*0.14),width:width-(width*0.05),
                backgroundColor:'white',borderRadius:10,margin:wp('3%'),shadowColor: '#003182',shadowOffset: { width: 0, height: 9 },shadowOpacity: 0.48,shadowRadius: 11.95,elevation:18}}>


                    < View style={styles.Imagebody}>
                      <CachedImage  source={{ uri:item.img.data }} style={styles.image} />
                    </View>

                    <View  style={styles.inner}>

                    <ShareItem id={item._id} name={item.title} img={item.img.data} />

                      <View style={styles.inner}>
                      <Text style={styles.titleArrtibute}>{item.category}</Text>
                        <Text style={styles.titleText} >{item.title}﻿</Text>
                        <View >
                          <Text style={styles.body}>{item.body}﻿</Text>
                        </View>
                        <View >
                          <Time date={item.publishDate} source={item.source}/>
                          <Text style={{marginTop:normalize(2),fontSize:normalize(10),color:'#afafaf'}}>curated by {item.post}</Text>
                        </View>
                      </View>


                    </View>

                  </View>

              </View>


            )
        }
     }
     _keyExtractor = (item, index) => item._id;



  render(){
    const getItemLayout = (data, index) => (
      {height:height-(height*0.14),width:width-(width*0.05)}
    );
      if(this.state.isLoading ){
            return(
              <View >
                <CachedImage  source={require('../images/load.gif')}    style={{left:wp('1%') ,width: wp('100'), height: hp('100')}}/>
              </View>
            )}

      return(

      <View style={{flex:1}}>
      <SettingButton navigate={this.props.navigation.navigate} parentMethod={this.getData.bind(this)}  />

       <StatusBar backgroundColor="black" animated />

            <Carousel
            firstItem={this.state.random}
            initialNumToRender={this.state.random}
             keyExtractor={this._keyExtractor}

              ref={(c) => { this._carousel = c; }}
              data={this.state.dataSource}
              renderItem={this._renderItem.bind(this)}
              sliderWidth={width}
              itemWidth={width}
              removeClippedSubviews={true }
              swipeThreshold={0}
              maxToRenderPerBatch={10}
              windowSize={10}
              getItemLayout={getItemLayout}
              sliderHeight={height-(height*0.14)}
              sliderHeight	={height-(height*0.14)}
              contentContainerCustomStyle={{shadowColor: '#003182',shadowOffset: { width: 0, height: 9 },shadowOpacity: 0.48,shadowRadius: 11.95,elevation:18}}
              containerCustomStyle={{shadowColor: '#003182',shadowOffset: { width: 0, height: 9 },shadowOpacity: 0.48,shadowRadius: 11.95,elevation:18}}
              onSnapToItem={(index) => { itemIndex=index;} }
              onBeforeSnapToItem={(index) => AsyncStorage.setItem('POINTER', (index).toString()) }

            />


            <View style={{ bottom:normalize(2),height:normalize(45),backgroundColor:'#8E10EC',flexDirection:'row',elevation:1,zIndex:0,bottom:normalize(3),overflow:'visible' ,borderRadius: 5}}>
            <TouchableOpacity underlayColor='#8e0eed'style={{left:normalize(30),position: 'absolute',zIndex:5}}onPress={()=>
               {
                 this.props.navigation.navigate({ routeName: 'Web',params:{url:this.state.dataSource[itemIndex].url} });

                this.setModalVisible(!this.state.modalVisible);
              }} >

            <View>
              <Icon name="readme" size={normalize(30)}  color='white' />
              <Text style={{color:'white',fontSize:normalize(9)}}>Read More</Text>
            </View>
            </TouchableOpacity>
            </View>





         </View>

      )
    }
  }
  const stylesRem = EStyleSheet.create({

    body: {
      color: 'black',
      fontSize:'3rem',
      // fontSize:
      flexShrink:1                             // relative REM unit
    },


  });
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
      flex: 3,
      padding:6,
      marginLeft:normalize(1),
      marginRight:normalize(1)

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
  }
  };
