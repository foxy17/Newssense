import React,{Component} from "react";
import { View, Text,ActivityIndicator,Dimensions,Image } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
const {width, height} = Dimensions.get('window');
import ShareItem from '../utils/ShareItem'

export default class ExternalScreen extends Component {
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



      if(this.state.isLoading){
            return(
              <View >
                <ActivityIndicator />
              </View>
            )}
      return(
        <View>
         <Text> {this.state.dataSource.title}</Text>
         <Text> {this.state.dataSource.body}</Text>
         <Text> {this.state.img}</Text>
           <Image source={{ uri:this.state.img}} style={{width: 70, height: 80}} />

        </View>


      )


    //   return(
    //
    //     < View  style={{  flex: 1,position:'absolute',height:height,width:width,backgroundColor:'white'}}>
    //
    //       < View style={styles.Imagebody}>
    //         <Image source={{ uri:itemId.img.data }} style={styles.image} />
    //       </View>
    //
    //       <View style={styles.inner}>
    //         <Text>{itemId.body} </Text>
    //       </View>
    //
    //     </View>
    //
    // )




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
