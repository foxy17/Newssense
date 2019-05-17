import React,{Component} from "react";
import { View, Text,ActivityIndicator,
FlatList,Image,Dimensions,Animated,PanResponder  } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
const {width, height} = Dimensions.get('window');
export default class HomeScreen extends Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true,image:"",url:"",
    currentIndex:0,pan: new Animated.ValueXY(),
    swiped_pan: new Animated.ValueXY({x:-width,y:0}),
    };

  this.state.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([
        null,
        {
          dx: this.state.pan.x // x,y are Animated.Value
          // dy: this.state.pan.y,
        },
      ]),
      onPanResponderRelease: (e,{vx, dx}) => {
        if (-vx >= 0.5 || -dx >= 0.5 * width) {
          Animated.timing(this.state.pan, {
            toValue: ({ x: -width, y: 0 }),
            duration:400
          }).start(() => {

            this.setState({ currentIndex: this.state.currentIndex + 1 },()=>{this.state.pan.setValue({ x: 0, y: 0 })})
          })
        }
        else{
          Animated.spring(
            this.state.pan, // Auto-multiplexed
            {toValue: {x: 0, y: 0}}, // Back to zero
          ).start();
        }
      },
    });
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



  renderArtciles=()=>{
    return this.state.dataSource.map((item,i)=>{
        if (i < this.state.currentIndex)
        {
          return null
        }
         if (i == this.state.currentIndex)
        {
          return(
            <Animated.View key={item._id} {...this.state.panResponder.panHandlers} style={this.state.pan.getLayout()}>
              < View  style={{  flex: 1,position:'absolute',height:height,width:width,backgroundColor:'white'}}>

                < View style={styles.Imagebody}>
                  <Image source={{ uri:item.img.data }} style={styles.image} />
                </View>

                <View style={styles.inner}>
                  <Text>{item.body} i==={i}{this.state.currentIndex} </Text>
                </View>

              </View>
          </Animated.View>

        )
      }
      else{
        return(
          <Animated.View key={item._id} >
            < View  style={{  flex: 1,position:'absolute',height:height,width:width,backgroundColor:'white'}}>

              < View style={styles.Imagebody}>
                <Image source={{ uri:item.img.data }} style={styles.image} />
              </View>

              <View style={styles.inner}>
                <Text>{item.body} i==={i}{this.state.currentIndex} ﻿</Text>
              </View>

            </View>
        </Animated.View>

      )


      }

    }
  ).reverse()
}


  render(){

      if(this.state.isLoading){
            return(
              <View >
                <ActivityIndicator />
              </View>
            )}

      return(
        <View style={{flex:1}}>
          {this.renderArtciles()}
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
