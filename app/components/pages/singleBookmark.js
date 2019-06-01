import React,{Component} from "react";
import { View, Text,ActivityIndicator,Dimensions,Image ,StatusBar} from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
const {width, height} = Dimensions.get('window');
import ShareItem from '../utils/ShareItem'

export default class SingleBookmarkScreen extends Component {
  static navigationOptions = {
   title: 'Article',
 };
  constructor(props){
    super(props);
    const { navigation } = this.props;
    const { id } =  navigation.getParam('id');

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
          img:responseJson.data.img.data,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  render() {
    const { navigation } = this.props;
    const id = navigation.getParam('id', 'NO-ID');
    console.log("HEYY"+id);
    this.state.params="https://news119.herokuapp.com/find/"+id;
     StatusBar.setBackgroundColor('#0099cb', true);
      if(this.state.isLoading){
            return(
              <View >
                <ActivityIndicator />
              </View>
            )}
            return(
              <View style={{flex:1,backgroundColor:'#00cafe'}}>
                <View style={{ flex: 1,position:'absolute',height:height-(height*0.1),width:width-(width*0.05),
              backgroundColor:'white',borderRadius:50,margin:10,shadowColor: '#003182',shadowOffset: { width: 0, height: 9 },shadowOpacity: 0.48,shadowRadius: 11.95,elevation:18}}>


                  < View style={styles.Imagebody}>
                    <Image source={{ uri:this.state.img }} style={styles.image} />
                  </View>

                  <View  style={styles.inner}>
                  <ShareItem id={this.state.dataSource._id} name={this.state.dataSource.title} />
                    <View style={styles.inner}>

                      <Text style={styles.titleText} >{this.state.dataSource.title}﻿</Text>
                      <View>
                        <Text style={styles.body}>{this.state.dataSource.body}﻿</Text>
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
    borderRadius:50,




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
    fontSize: 20,
    fontWeight: 'bold',
  },
  body: {

    color: 'black',
    fontSize: 15,
    marginBottom:5,

  },

titleArrtibute:{
    color:'black',
    top:0,
    fontSize: 20,
    fontWeight: 'bold',
}
,
titleText: {
  color:'black',
  top:5,
 fontSize: 40,
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
