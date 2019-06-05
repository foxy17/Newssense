import React,{Component} from "react";
import { View, Text,ActivityIndicator,StatusBar,
FlatList,Image,Dimensions,Animated,ScrollView ,RefreshControl,PanResponder,TouchableOpacity,TouchableWithoutFeedback,ImageBackground  } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
const {width, height} = Dimensions.get('window');
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
import DeepLinking from 'react-native-deep-linking';
import ShareItem from '../utils/ShareItem'
import SettingButton from '../utils/settings'
import { connect } from 'react-redux';
import checkPointer from '../utils/checkPointer';
import AsyncStorage from '@react-native-community/async-storage';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default class HomeScreen extends Component {
  constructor(props){
    super(props);
    this.state ={ isLoading: true,len:"false",views:0,Pointer:0,hasPointer:false,
    currentIndex:0,pan: new Animated.ValueXY(),
    swiped_pan: new Animated.ValueXY({x:-width,y:0}),
    };
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
  },
      onPanResponderRelease: (e,gestureState) => {
        if(this.state.len=="true" &&( -gestureState.vx >0.7 || -gestureState.dx >= 50))
        {
          Animated.spring(this.state.pan, {
              toValue: ({ x: 0, y: 0 })
          }).start()
        }
      else if (this.state.currentIndex > 0 && (gestureState.dx > 50 || gestureState.vx > 0.7)) {
            Animated.timing(this.state.swiped_pan, {
                toValue: ({ x: 0, y: 0 }),
                duration: 400
            }).start(() => {

                this.setState({ currentIndex: this.state.currentIndex - 1 ,len:"false"})
                this.state.swiped_pan.setValue({ x: -width, y: 0 })

            })
        }
        else if (-gestureState.vx >0.7 || -gestureState.dx >= 50) {
          Animated.timing(this.state.pan, {
            toValue: ({ x: -width, y: 0 }),
            duration:400
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
    });
  }//Pan onPanResponderRelease

//Check article postion

async componentWillMount() {
  const has = await checkPointer();
  let pointer = parseInt(await AsyncStorage.getItem('POINTER'));
  this.setState({ hasPointer:true, Pointer: pointer });
}



  componentDidMount(){
    return fetch('https://news119.herokuapp.com/getData')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({

          isLoading: false,
          loaded:true,
          dataSource: responseJson.data,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

update(){

}

  renderArtciles=()=>{
    const startingIndex =this.state.Pointer;
    var AnimatedImage = Animated.createAnimatedComponent(ImageBackground);
    var len =this.state.dataSource.length;
    return this.state.dataSource.map((_,i)=>{
      const shiftedIndex = (startingIndex + i) %  this.state.dataSource.length
      const item = this.state.dataSource[shiftedIndex];
        if (i == this.state.currentIndex-1)
        {
          if(item.special==false)
          {
            return(
              <Animated.View key={item._id} {...this.state.panResponder.panHandlers} style={this.state.swiped_pan.getLayout()}>

                <View style={{ marginTop:hp('5%'), flex: 1,position:'absolute',height:height-(height*0.15),width:width-(width*0.05) ,
                 backgroundColor:'white',borderRadius:10,margin:wp('3%'),shadowColor: '#003182',shadowOffset: { width: 0, height: 9 },shadowOpacity: 0.48,shadowRadius: 11.95,elevation:18}}>


                  < View style={styles.Imagebody}>
                    <Image source={{ uri:item.img.data }} style={styles.image} />
                  </View>

                  <View  style={styles.inner}>
                  <ShareItem id={item._id} />
                    <View style={styles.inner}>
                    <Text style={styles.titleArrtibute}>{item.category}</Text>
                      <Text style={styles.titleText} >{item.title}﻿</Text>
                      <View>
                        <Text style={styles.body}>{item.body}﻿</Text>
                      </View>
                    </View>
                  </View >


                  </View>

            </Animated.View>

          )

          }
          else{
            return(

              <Animated.View key={item._id} {...this.state.panResponder.panHandlers} style={this.state.swiped_pan.getLayout()}>
              <AnimatedImage  source={{ uri:item.img.data }}
               imageStyle={{ borderRadius: 10 }} style={{marginTop:hp('5%'),flex: 1,position:'absolute',height:height-(height*0.15),width:width-(width*0.05),borderRadius:50,margin:10,
            borderRadius:10,margin:wp('3%'),shadowColor: '#003182',shadowOffset: { width: 0, height: 9 },shadowOpacity: 0.48,shadowRadius: 11.95,elevation:18}}>
              <TouchableOpacity activeOpacity={1}  onPress={()=>{this.props.navigation.navigate('Details', {itemId: item})}}  >
                <Text>    </Text>
                </TouchableOpacity>
              </AnimatedImage>

            </Animated.View>
              )
          }



        }
        else if (i < this.state.currentIndex)
        {
          return null
        }
         if (i == this.state.currentIndex)
        {
            if(len==i+1){ this.state.len="true"} //to chekc for last card


                if(item.special)
                {
                  return(
                    <Animated.View key={item._id} {...this.state.panResponder.panHandlers} style={[this.state.pan.getLayout()]}>
                      <AnimatedImage  source={{ uri:item.img.data }}
                       imageStyle={{ borderRadius: 10 }} style={{marginTop:hp('5%'),flex: 1,position:'absolute',height:height-(height*0.15),width:width-(width*0.05),
                       borderRadius:50,margin:wp('3%'),shadowColor: '#003182',shadowOffset: { width: 0, height: 9 },shadowOpacity: 0.48,shadowRadius: 11.95,elevation:18}}>
                      <TouchableOpacity activeOpacity={1}  onPress={()=>{this.props.navigation.navigate('Details', {itemId: item})}}
                        >
                    <View style={{height:height-(height*0.15),width:width-(width*0.05),backgroundColor:'transparent',borderRadius:50}}>

                    </View>
                        </TouchableOpacity>
                      </AnimatedImage>

                  </Animated.View>

                  )
                }
                else {

                      return(
                        <Animated.View key={item._id} {...this.state.panResponder.panHandlers} style={this.state.pan.getLayout()}>


                          <View style={{ marginTop:hp('5%'),flex: 1,position:'absolute',height:height-(height*0.15),width:width-(width*0.05),
                        backgroundColor:'white',borderRadius:10,margin:wp('3%'),shadowColor: '#003182',shadowOffset: { width: 0, height: 9 },shadowOpacity: 0.48,shadowRadius: 11.95,elevation:18}}>


                            < View style={styles.Imagebody}>
                              <Image source={{ uri:item.img.data }} style={styles.image} />
                            </View>

                            <View  style={styles.inner}>

                            <ShareItem id={item._id} name={item.title} />

                              <View style={styles.inner}>
                              <Text style={styles.titleArrtibute}>{item.category}</Text>
                                <Text style={styles.titleText} >{item.title}﻿</Text>
                                <View>
                                  <Text numberOfLines={12} adjustsFontSizeToFit allowFontScaling minimumFontScale={.01} style={styles.body}>{item.body}﻿</Text>
                                </View>
                              </View>



                            </View>
                          </View>
                      </Animated.View>

                    )
                }
        }
      else{
          if(item.special==false){
            return(
              <Animated.View key={item._id} >

                <View style={{ marginTop:hp('5%'), flex: 1,position:'absolute',height:height-(height*0.15),width:width-(width*0.05),backgroundColor:'white',
                borderRadius:10,margin:wp('3%')}}>


                  < View style={styles.Imagebody}>
                    <Image source={{ uri:item.img.data }} style={styles.image} />
                  </View>

                  <View  style={styles.inner}>
                  <ShareItem id={item._id} />
                    <View style={styles.inner}>
                    <Text style={styles.titleArrtibute}>{item.category}</Text>
                      <Text style={styles.titleText} >{item.title}﻿</Text>
                      <View>
                        <Text style={styles.body}>{item.body}﻿</Text>
                      </View>
                    </View>
                  </View >


                </View>
            </Animated.View>
          )
        }

        else{
          return(

            <Animated.View key={item._id} >
              <AnimatedImage  source={{ uri:item.img.data }}  imageStyle={{ borderRadius: 10 }}
              style={{marginTop:hp('5%'),flex: 1,position:'absolute',height:height-(height*0.15),width:width-(width*0.05),borderRadius:10,margin:wp('3%')}}>
              <TouchableOpacity activeOpacity={1}  onPress={()=>{this.props.navigation.navigate('Details', {itemId: item})}}  >
                <Text>  </Text>
                </TouchableOpacity>
              </AnimatedImage>

          </Animated.View>
            )
        }
      }

    }
  ).reverse()
}



  render(){

      if(this.state.isLoading){
            return(
              <View >
                <Image source={require('../images/load.gif')}    style={{left:wp('1%') ,width: wp('100'), height: hp('100')}}/>
              </View>
            )}

      return(

      <View style={{flex:1}}>
      <SettingButton navigate={this.props.navigation.navigate}  />
       <StatusBar
          backgroundColor="black"
          animated />
          <ScrollView   contentContainerStyle={{  flexGrow: 1 ,top:hp('4%')}}
          // refreshControl={
          //                <RefreshControl
          //                  refreshing={loading}
          //                  onRefresh={refresh}
          //                />}
          >
            {this.renderArtciles()}
                 </ScrollView>
          <View style={{position:'absolute',zIndex:-20,backgroundColor:'#f3f3f3'}}>

                          <View style={{  flex: 1,position:'absolute',height:height,width:width,backgroundColor:'white'}}>
                            <View  style={styles.inner}>
                              <View style={styles.inner}>
                                <Text style={{color:'black',  top:hp('10%'),fontSize: wp('10%'),fontWeight: 'bold'}} >No More Cards</Text>

                              </View>
                            </View >


                          </View>
          </View>
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
      marginLeft:10,
      marginRight:10

    },
    text: {
      flex:1,
      color: '#fff',
      fontSize: wp('8%'),
      fontWeight: 'bold',
    },
    body: {

      color: 'black',
      fontSize: wp('4%'),




    },

  titleArrtibute:{
      color:'#679CEA',
      top:0,
      fontSize: wp('5%'),
      fontWeight: 'bold',
  }
,
  titleText: {
    color:'black',
    top:5,
   fontSize: wp('8%'),
   fontWeight: 'bold',
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
