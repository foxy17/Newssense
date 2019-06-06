import React,{Component} from "react";
import { View, Text,ActivityIndicator,Dimensions,Image,StatusBar } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
const {width, height} = Dimensions.get('window');
import ShareItem from '../utils/ShareItem'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class ExternalScreen extends Component {
  constructor(props){
    super(props);
    this.state ={ isLoading: "true"};

  }


  render() {
    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');


      return(

        <View style={{flex:1,backgroundColor:'#f3f3f3'}}>
        <StatusBar
           backgroundColor="black"
           animated />
          <View style={{ flex: 1,position:'absolute',height:height-(height*0.15),width:width-(width*0.05),
        backgroundColor:'white',top:hp('5%'),borderRadius:10,margin:wp('3%'),shadowColor: '#003182',shadowOffset: { width: 0, height: 9 },shadowOpacity: 0.48,shadowRadius: 11.95,elevation:18}}>


            < View style={styles.Imagebody}>
              <Image source={{ uri:itemId.img.data }} style={styles.image} />
            </View>

            <View  style={styles.inner}>
            <ShareItem id={itemId._id} name={itemId.title} />
              <View style={styles.inner}>

                <Text style={styles.titleText} >{itemId.title}﻿</Text>
                <View>
                  <Text style={styles.body}>{itemId.body}﻿</Text>
                </View>
              </View>



            </View>
          </View>
          </View>



    )




}
}
const styles = {
  image: {

    flex: 1,
    height:height-(height*0.15),
    width:width-(width*0.05),
    resizeMode:'contain',
    borderTopLeftRadius: 10,
  borderTopRightRadius: 10,

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
  },


};
