import React,{Component} from "react";
import { View, Text } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

export default class HomeScreen extends Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true,  ColorHolder : '#00BCD4'
    ,image:"",url:""
      }
  }

  componentDidMount(){
    return fetch('http://192.168.0.124:3000/getData')
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



  viewfunc(url){
    return(

      this.state.dataSource.map((item)=>{

        return(

        < View key={Math.random()} style={styles.slide3}>

          <Text style={styles.text}>{item.title}</Text>
          <Image
          style={{
            width: 90,
            height: 100,

          }}
          source={{
            uri:
              item.img.data
          }}
        />

          <Image
          style={{
            width: 51,
            height: 51,

          }}
          source={{
            uri:
              'data:image/png;base64,'+item.img,
          }}
        />
          <Text style={styles.body}>{item.body}{item._id}</Text>

        </View>)

  }
  ))}


  render(){

      if(this.state.isLoading){
            return(
              <View >
                <ActivityIndicator />
              </View>
            )}

      return(

      <Swiper
       style={styles.wrapper}
        paginationStyle={{ container: { backgroundColor: 'transparent' } }}
       paginationLeft={''}

       paginationRight={''}
       smoothTransition
       stack
       loop
       dragDownToBack
       dragY>
       {this.viewfunc()}
     </Swiper>

      )
    }
  }

  const styles = {
    wrapper: {
      backgroundColor: '#009688',
      flex: 1,
      height:5,

    },
    slide1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#e91e63',
      borderRadius: 20 ,
      marginRight:5,
      marginLeft:5,
    },
    slide2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#673ab7',
      borderRadius: 20 ,
      marginRight:5,
      marginLeft:5,
    },
    slide3: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#3f51b5',
      borderRadius: 20 ,
      marginRight:5,
      marginLeft:5,
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
      justifyContent: 'center'
    },
    horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10
    }
  };
