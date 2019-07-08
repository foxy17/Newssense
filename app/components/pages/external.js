import React,{Component} from "react";
import { View, Text,ActivityIndicator,Dimensions,Image,NetInfo,Animated,ImageBackground,TouchableOpacity ,Alert} from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
const {width, height} = Dimensions.get('window');
import ShareItem from '../utils/ShareItem';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { AndroidBackHandler } from 'react-navigation-backhandler';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import normalize from '../utils/normalize'
import {
    CachedImage,
    ImageCacheProvider,
    ImageCacheManager
} from 'react-native-cached-images'
import Time from '../utils/Time'
export default class ExternalScreen extends Component {
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
      link="http://dash.newssense.co/find/"+id;
  }
  else{
      link="http://dash.newssense.co/find/"+this.props.navigation.state.params.link;
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

            this.setState({

              isLoading: false,
              dataSource: responseJson.data,

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

  render() {
    console.log(this.state.params,"LINK");
    console.log(this.props.navigation.state.params.link,"LINKSS");

var AnimatedImage = Animated.createAnimatedComponent(ImageBackground);
      if(this.state.isLoading){
            return(
              <View >
              <CachedImage  source={require('../images/load.gif')}    style={{left:wp('1%') ,width: wp('100'), height: hp('100')}}/>
              </View>
            )}
        var item=this.state.dataSource;



            if(item.special==false){
              return(

        <View style={{flex:1,backgroundColor:'#f3f3f3'}}>
        <Icon2  name="close-circle" size={normalize(25)} color="black" style={{ shadowColor: 'red',
        shadowOpacity: 0.5,shadowRadius: 5,shadowOffset: {width: 0 , height: 1, }, position: 'absolute',alignSelf:'flex-end',right:wp('4%'),top:hp('1%')}}
        onPress={() => { this.props.navigation.goBack()}}/>
        <View style={{ marginTop:hp('7%'), flex: 1,position:'absolute',height:height-(height*0.15),width:width-(width*0.05) ,
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
                <Text style={styles.body}>{item.body}﻿</Text>
              </View>
              <View>
              <Time date={item.publishDate} source={item.source}/>
              <Text style={{marginTop:normalize(2),fontSize:normalize(10),color:'#afafaf'}}>curated by {item.post}</Text>
              </View>
            </View>
          </View >


          </View>
          </View>
        )
        }
          else{
            return(

              <Animated.View key={item._id} >

                <AnimatedImage  source={{ uri:item.img.data }}  imageStyle={{ borderRadius: 10 }}
                style={{marginTop:normalize(35),flex: 1,position:'absolute',height:height-(height*0.15),width:width-(width*0.05),borderRadius:10,margin:wp('3%')}}>
                <TouchableOpacity activeOpacity={1}  onPress={()=>{this.props.navigation.navigate('Details', {itemId: item})}}  >
                  <Text>  </Text>
                  </TouchableOpacity>
                </AnimatedImage>

            </Animated.View>

          )

          }

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
  }
  };
