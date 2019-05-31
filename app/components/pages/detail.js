import React,{Component} from "react";
import { View, Text,ActivityIndicator,Dimensions,Image } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
const {width, height} = Dimensions.get('window');
import ShareItem from '../utils/ShareItem'

export default class ExternalScreen extends Component {
  constructor(props){
    super(props);
    this.state ={ isLoading: "true"};

  }


  render() {
    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');

      return(
        <View style={{flex:1,backgroundColor:'#00cafe'}}>
          <View style={{ flex: 1,position:'absolute',height:height-(height*0.1),width:width-(width*0.05),
        backgroundColor:'white',borderRadius:50,margin:10,shadowColor: '#003182',shadowOffset: { width: 0, height: 9 },shadowOpacity: 0.48,shadowRadius: 11.95,elevation:18}}>


            < View style={styles.Imagebody}>
              <Image source={{ uri:itemId.img.data }} style={styles.image} />
            </View>

            <View  style={styles.inner}>
            <ShareItem id={itemId._id} />
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
    height:null,
    width:null,
    resizeMode:'cover',
    borderTopLeftRadius: 50,
  borderTopRightRadius: 50,

  },


  Imagebody: {
    flex: 2,
    backgroundColor:'black',
    borderRadius:50


  },
  inner: {
    flex: 3,
    padding:4

  },
  text: {
    flex:1,
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  body: {
    flex:4,
    color: '#fff',
    fontSize: 15,
    marginBottom:5,



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
  }
};
