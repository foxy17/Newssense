import React,{Component} from "react";
import { View, Text,ActivityIndicator,Dimensions,Image,Animated,ImageBackground,TouchableOpacity } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
const {width, height} = Dimensions.get('window');
import ShareItem from '../utils/ShareItem'
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
    console.log(navigation);
    const { id } =  navigation.getParam('link');
    console.log("ID",id);

    let link="https://news119.herokuapp.com/find/"+id;
    this.state ={ isLoading: "true",params:link,dataSource:{},img:''};

  }
  componentDidMount(){
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

  render() {

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
        <View style={{ marginTop:hp('5%'), flex: 1,position:'absolute',height:height-(height*0.15),width:width-(width*0.05) ,
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
                <Text style={{marginTop:normalize(16),fontSize:normalize(10),color:'#afafaf'}}>Source:{item.source}</Text>
                <Time date={item.publishDate} />
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
