import React,{Component} from "react";
import { View, Text,ActivityIndicator,Dimensions,Image } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
const {width, height} = Dimensions.get('window');

export default class DetailsScreen extends Component {
  constructor(props){
    super(props);
    this.state ={ isLoading: "true"};

  }


  render() {
    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');

      return(

        < View  style={{  flex: 1,position:'absolute',height:height,width:width,backgroundColor:'white'}}>

          < View style={styles.Imagebody}>
            <Image source={{ uri:itemId.img.data }} style={styles.image} />
          </View>

          <View style={styles.inner}>
            <Text>{itemId.body} </Text>
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
    resizeMode:'center'

  },

  Imagebody: {
    flex: 2,
    backgroundColor:'black'


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
