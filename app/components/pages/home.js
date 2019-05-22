import React,{Component} from "react";
import { View, Text,ActivityIndicator,
FlatList,Image,Dimensions,Animated,PanResponder,TouchableOpacity,TouchableWithoutFeedback,ImageBackground  } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
const {width, height} = Dimensions.get('window');
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default class HomeScreen extends Component {
  constructor(props){
    super(props);
    this.state ={ isLoading: true,id:0,views:0,priority:0,
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
5
      }

    },


      onPanResponderRelease: (e,gestureState) => {

        if (this.state.currentIndex > 0 && gestureState.dx > 50 && gestureState.vx > 0.7) {
            Animated.timing(this.state.swiped_pan, {
                toValue: ({ x: 0, y: 0 }),
                duration: 400
            }).start(() => {

                this.setState({ currentIndex: this.state.currentIndex - 1 })
                this.state.swiped_pan.setValue({ x: -width, y: 0 })

            })
        }
        else if (-gestureState.vx >0.7 || -gestureState.dx >= 50) {
          Animated.timing(this.state.pan, {
            toValue: ({ x: -width, y: 0 }),
            duration:400
          }).start(() => {

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
  }

  componentDidMount(){
    return fetch('http://192.168.0.123:3000/getData')
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
    var AnimatedImage = Animated.createAnimatedComponent(ImageBackground);

    return this.state.dataSource.map((item,i)=>{

        if (i == this.state.currentIndex-1)
        {
          if(item.special==false)
          {
            return(
              <Animated.View key={item._id} {...this.state.panResponder.panHandlers} style={this.state.swiped_pan.getLayout()}>
                < View  style={{  flex: 1,position:'absolute',height:height,width:width,backgroundColor:'white'}}>

                  < View style={styles.Imagebody}>
                    <Image source={{ uri:item.img.data }} style={styles.image} />
                  </View>

                  <View style={styles.inner}>
                    <Text>{item.body} </Text>
                  </View>

                </View>
            </Animated.View>

          )

          }
          else{
            return(

                <AnimatedImage key={item._id}  {...this.state.panResponder.panHandlers} source={{ uri:item.img.data }} style={[{flex: 1,position:'absolute',height:height,width:width,backgroundColor:'white'},this.state.swiped_pan.getLayout()]}>
                <View   style={styles.inner}>
                  <Text>{item.body}    </Text>
                </View>
                </AnimatedImage>
              )
          }



        }
        else if (i < this.state.currentIndex)
        {
          return null
        }
         if (i == this.state.currentIndex)
        {
          if(item.special)
          {
            return(
              <Animated.View key={item._id} {...this.state.panResponder.panHandlers} style={this.state.pan.getLayout()}>
                <AnimatedImage  source={{ uri:item.img.data }}style={{width: '100%', height: '100%'}}>
                <TouchableOpacity activeOpacity={1}  onPress={()=>{this.props.navigation.navigate('Details', {itemId: item})}}  style={styles.inner}>
                  <Text>{item.body}    </Text>
                  </TouchableOpacity>
                </AnimatedImage>


            </Animated.View>

          )
          }
          else {

                return(
                  <Animated.View key={item._id} {...this.state.panResponder.panHandlers} style={this.state.pan.getLayout()}>

                    <View style={{  flex: 1,position:'absolute',height:height,width:width,backgroundColor:'white'}}>


                      < View style={styles.Imagebody}>
                        <Image source={{ uri:item.img.data }} style={styles.image} />
                      </View>

                      <TouchableOpacity activeOpacity={1}  onPress={()=>{this.props.navigation.navigate('Details', {itemId: item})}}  style={styles.inner}>
                      <View style={styles.inner}>
                      <Text style={styles.titleText} >{item.title}﻿</Text>
                        <Text>{item.body}﻿</Text>
                      </View>
                      </TouchableOpacity>


                    </View>
                </Animated.View>

              )
          }
        }
      else{
          if(item.special==false){
            return(
              <Animated.View key={item._id} >
                < View  style={{  flex: 1,position:'absolute',height:height,width:width,backgroundColor:'white'}}>

                  < View style={styles.Imagebody}>
                    <Image source={{ uri:item.img.data }} style={styles.image} />
                  </View>

                  <View style={styles.inner}>
                  <Text style={styles.titleText} >{item.title}﻿</Text>
                    <Text>{item.body}﻿</Text>
                  </View>

                </View>
            </Animated.View>
          )
        }

        else{
          return(

              <AnimatedImage key={item._id}   source={{ uri:item.img.data }} style={{flex: 1,position:'absolute',height:height,width:width,backgroundColor:'white'}}>
              <View   style={styles.inner}>
                <Text>{item.body}    </Text>
              </View>
              </AnimatedImage>
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

    },s
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
    titleText: {
   fontSize: 20,
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
    }
  };
