import React,{Component} from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  FlatList,Image,
  StyleSheet,Alert,Button,TouchableOpacity,Linking,Platform,ImageBackground,StatusBar
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/FontAwesome';
const slides = [
  {
    key: 'somethun',
    title: 'Title 1',
    text: 'Description.\nSay something cool',
    image: require('../images/1.png'),
    backgroundColor: '#59b2ab',
    color:'#0099cb'
  },
  {
    key: 'somethun-dos',
    title: 'Title 2',
    text: 'Other cool stuff',
    image: require('../images/2.png'),
      backgroundColor: '#febe29',
    color:'#F15050'
  },
  {
    key: 'somethun1',
    title: 'Rocket guy',
    text: 'I\'m already out of descriptions\n\nLorem ipdsfdsfdsfdsf\nsdfsdf\nsdndssum bla bla bla',
    image: require('../images/3.png'),
    backgroundColor: '#22bcb5',
    color:'#0099cb'
  },
  {
    key: 'somethun12',
    title: 'Rocket guy',
    text: 'I\'m already out of descriptions\n\nLorem ipdsfdsfdsfdsf\nsdfsdf\nsdndssum bla bla bla',
    image: require('../images/4.png'),
    backgroundColor: '#22bcb5',
    color:'#F15050'
  }
];

export default class IntroScreen extends Component {
  constructor(props){
    super(props);
  this.state = {
   showRealApp: false,
   color1:'#14CAF4',
    color2:'#F15050',
   index:0
 }}


 _onDone = () => {

    this.props.navigation.navigate('Home');
  }
  _renderDoneButton = () => {
   return (

     <TouchableOpacity  onPress={this._onDone} style={styles.buttonCircle}>
     <Icon
      raised
      name='check'
      type='material'
      color='#517fa4'
      onPress={this._onDone}
    />
      </TouchableOpacity>


   );
 }
  _renderItem = (item) => {


      StatusBar.setBackgroundColor(this.state.color1, true);
      return (

        <ImageBackground  source={item.image} style={{width: '100%', height: '100%'}} >

        </ImageBackground>

      );
    }

    changecolor = () =>{
          // console.log(this.state.index);
      if(this.state.index===0){
          StatusBar.setBackgroundColor(this.state.color2, true);
          this.state.index=1;
      }
      else{
          StatusBar.setBackgroundColor(this.state.color1, true);
          this.state.index=0;
      }



    }
    render() {
      return <AppIntroSlider renderItem={this._renderItem} slides={slides} onSlideChange={this.changecolor} renderDoneButton={this._renderDoneButton}/>;

          }

   }
   const styles = StyleSheet.create({
     buttonCircle: {
   width: 40,
   height: 40,
   backgroundColor: 'rgba(0, 0, 0, .2)',
   borderRadius: 20,
   justifyContent: 'center',
   alignItems: 'center',
 },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'rgba(0, 0, 0, .8)'
  },
  image: {
    width: 320,
    height: 320,
  },
  text: {

    color: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  myButton:{
    padding: 5,
    height: 200,
    width: 200,  //The Width must be the same as the height
    borderRadius:400, //Then Make the Border Radius twice the size of width or Height
    backgroundColor:'rgb(195, 125, 198)',

  }
});
