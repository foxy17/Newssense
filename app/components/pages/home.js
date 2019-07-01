import React,{Component} from "react";
import { View, Text,ActivityIndicator,StatusBar,
FlatList,Image,Dimensions,Animated,Alert,ScrollView ,NetInfo ,Platform, PixelRatio,TouchableHighlight ,RefreshControl,PanResponder,TouchableOpacity,TouchableWithoutFeedback,ImageBackground  } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
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
import AsyncStorage from '@react-native-community/async-storage';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Share, {ShareSheet, Button} from 'react-native-share';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-simple-toast';
import en from 'javascript-time-ago/locale/en'
import Carousel , { Pagination } from 'react-native-snap-carousel';

import BackgroundTimer from 'react-native-background-timer';
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
    ,currentIndex:5,connection_Status : "",
    pan: new Animated.ValueXY(0),
    swiped_pan: new Animated.ValueXY({x:-width,y:0}),
    };
      console.log("hete",this.state.currentIndex);
    this.state.panResponder = PanResponder.create({
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
        var x = gestureState.dx;
      var y = gestureState.dy;
        if (x != 0 ) {
         return true;
       }
        return false;
      },
      onPanResponderMove: (e, gestureState) => {

        if(gestureState.dx === 0 && gestureState.dy === 0)
        {
          return !(gestureState.dx === 0 && gestureState.dy === 0)
        }
        if(gestureState.dx > 0 && this.state.currentIndex>0)
        {
          this.state.swiped_pan.setValue({
            x:-width+gestureState.dx,y:0
          })
          return Animated.event([
          null,
          {
            dx: this.state.swiped_pan.x// x,y are Animated.Value
            // dy: this.state.pan.y,
          },
      ])
        }
        else{
          this.state.pan.setValue({
            x:gestureState.dx,y:0
          })
          return Animated.event([
          null,
          {
            dx: this.state.pan.x // x,y are Animated.Value
            // dy: this.state.pan.y,
          },
      ]) (e, gestureState)
    }
  }, onPanResponderTerminate: (evt, gestureState) => {
    if(this.state.len=="true" &&( -gestureState.vx >0.1 || -gestureState.dx >= wp('5%')))
    {
      Animated.spring(this.state.pan, {
          toValue: ({ x: 0, y: 0 })
      }).start()
    }
  else if (this.state.currentIndex > 0 && (gestureState.dx > wp('5%') || gestureState.vx > 0.05)) {
        Animated.timing(this.state.swiped_pan, {
            toValue: ({ x: 0, y: 0 }),
            duration: 200
        }).start(() => {

            this.setState({ currentIndex: this.state.currentIndex - 1 ,len:"false"})
            this.state.swiped_pan.setValue({ x: -width, y: 0 })

        })
    }
    else if (-gestureState.vx >0.05 || -gestureState.dx >= wp('5%')) {
      Animated.timing(this.state.pan, {
        toValue: ({ x: -width, y: 0 }),
        duration:200
      }).start(() => {
          AsyncStorage.setItem('POINTER', (this.state.currentIndex+this.state.Pointer+1).toString());
        this.setState({ currentIndex: this.state.currentIndex + 1 },()=>{this.state.pan.setValue({ x: 0, y: 0 })})
      })
    }

    else {
         Animated.parallel([
             Animated.spring(this.state.pan, {
                 toValue: ({ x: 0, y: 0 })
             }),
             Animated.spring(this.state.swiped_pan, {
                 toValue: ({ x: -width, y: 0 })
             })

         ]).start()

    }
      },
      onPanResponderRelease: (e,gestureState) => {
        if(this.state.len=="true" &&( -gestureState.vx >0.01 || -gestureState.dx >= wp('5%')))
        {
          Animated.spring(this.state.pan, {
              toValue: ({ x: 0, y: 0 })
          }).start()
        }
      else if (this.state.currentIndex > 0 && (gestureState.dx > wp('1%') || gestureState.vx > 0.01)) {
            Animated.timing(this.state.swiped_pan, {
                toValue: ({ x: 0, y: 0 }),
                duration: 200
            }).start(() => {
                AsyncStorage.setItem('POINTER', (this.state.currentIndex-1).toString());
                console.log(AsyncStorage.getItem('POINTER'));
                this.setState({ currentIndex: this.state.currentIndex - 1 ,len:"false"})
                this.state.swiped_pan.setValue({ x: -width, y: 0 })

            })
        }
        else if (-gestureState.vx >0.01 || -gestureState.dx >= wp('5%')) {
          Animated.timing(this.state.pan, {
            toValue: ({ x: -width, y: 0 }),
            duration:200
          }).start(() => {
            console.log( AsyncStorage.getItem('POINTER'));
            AsyncStorage.setItem('POINTER', (this.state.currentIndex+1).toString());
            this.setState({ currentIndex: this.state.currentIndex + 1 },()=>{this.state.pan.setValue({ x: 0, y: 0 })})
          })
        }

        else {
             Animated.parallel([
                 Animated.spring(this.state.pan, {
                     toValue: ({ x: 0, y: 0 })
                 }),
                 Animated.spring(this.state.swiped_pan, {
                     toValue: ({ x: -width, y: 0 })
                 })

             ]).start()

        }
      },
    });
  }//Pan onPanResponderRelease

//Check article postion

async componentWillMount() {

  const has = await checkPointer();
  console.log("P",parseInt(has));
  this.state.currentIndex=has;
  console.log(this.state.currentIndex);
  this.setState({ hasPointer:false, random: parseInt(has) });
}

 async  preload(data){
   var len;
   if(data.length<10){len=data.length}
   else {len=10}
   console.log("LENGTH",len);
    for(let i=0;i<10;i++){
      var item=data[i];
      var response=await defaultImageCacheManager.downloadAndCacheUrl(item.img.data);
      console.log(response);
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
      BackgroundTimer.runBackgroundTimer(() => {
        this.getData();
          this.clearCache();
        },
        1800000);



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
    console.log(this.state.connection_Status)
    if(this.state.connection_Status=="Online")
    {
    const component = this
    AsyncStorage.setItem('POINTER', '0');
    this.setState({isLoading: true})

    fetch('http://dash.newssense.co/getData')
      .then((response) => response.json())
      .then((responseJson) => {



        this.setState({

          loaded:true,
          random:0,
          dataSource: responseJson.data.sort((a,b)=>a.date<b.date),
        }, async function(){
            await component.preload(responseJson.data)

              Toast.show('Refreshed');
            component.setState({isLoading: false})

          AsyncStorage.setItem('ApiData',JSON.stringify(this.state.dataSource))


        });
      })
      .catch((error) =>{
        console.error(error);
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

  _renderItem ({item, index}) {
    if(item.special)
        {
          return(

          <Animated.View >

                <CachedImage  source={{ uri:item.img.data }}
                 imageStyle={{ borderRadius: 10 }} style={{marginTop:normalize(40),flex: 1,position:'absolute',height:height-(height*0.14),width:width-(width*0.05),
                 borderRadius:50,margin:wp('3%'),shadowColor: '#003182',shadowOffset: { width: 0, height: 9 },shadowOpacity: 0.48,shadowRadius: 11.95,elevation:18}}>
                <TouchableOpacity activeOpacity={1} style={{height:height-(height*0.14),width:width-(width*0.05)}}  onPress={()=>{
                  var idshort='https://news.newssense.co/'+item._id;
                  var dm = new firebase.links.DynamicLink(
                           idshort,
                         'https://news.newssense.co'
                       ).android.setPackageName('com.newSense');
                       console.log(dm);

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
          </Animated.View>



          )
        }
        else {

              return(
                <Animated.View >

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
                          <Time date={item.date} source={item.source}/>
                          <Text style={{marginTop:normalize(2),fontSize:normalize(10),color:'#afafaf'}}>curated by {item.post}</Text>
                        </View>

                      </View>
                    </View>
                  </View>

              </Animated.View>

            )
        }
     }


     get pagination () {
             const { dataSource, activeSlide } = this.state;
             return (
                 <Pagination
                   dotsLength={dataSource.length}
                   activeDotIndex={activeSlide}
                   containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
                   dotStyle={{
                       width: 10,
                       height: 10,
                       borderRadius: 5,
                       marginHorizontal: 8,
                       backgroundColor: 'rgba(255, 255, 255, 0.92)'
                   }}
                   inactiveDotStyle={{
                       // Define styles for inactive dots here
                   }}
                   inactiveDotOpacity={0.4}
                   inactiveDotScale={0.6}
                 />
             );
         }

  render(){
    const { navigation } = this.props;
    try{
      console.log(navigation.getParam('link'));
    }
    catch(e)
    {

    }


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
              ref={(c) => { this._carousel = c; }}
              data={this.state.dataSource}
              renderItem={this._renderItem}
              sliderWidth={width}
              itemWidth={width}
              swipeThreshold={0}
              sliderHeight={height-(height*0.14)}
              sliderHeight	={height-(height*0.14)}
              contentContainerCustomStyle={{shadowColor: '#003182',shadowOffset: { width: 0, height: 9 },shadowOpacity: 0.48,shadowRadius: 11.95,elevation:18}}
              containerCustomStyle={{shadowColor: '#003182',shadowOffset: { width: 0, height: 9 },shadowOpacity: 0.48,shadowRadius: 11.95,elevation:18}}
              onSnapToItem={(index) =>   AsyncStorage.setItem('POINTER', (index).toString()) }
              useScrollView
            />



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
