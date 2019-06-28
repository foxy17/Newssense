import React,{Component} from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  FlatList,Image,Platform,StyleSheet,Button, Dimensions,StatusBar,Linking
} from 'react-native';
import { AndroidBackHandler } from 'react-navigation-backhandler';
var width = Dimensions.get('window').width;
import Icon from 'react-native-vector-icons/Foundation';
import Icon2 from 'react-native-vector-icons/Entypo';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import Icon4 from 'react-native-vector-icons/FontAwesome';
import normalize from '../utils/normalize'
import Share, {ShareSheet} from 'react-native-share';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import SwitchToggle from 'react-native-switch-toggle';


export default class SettingsScreen extends Component {
  constructor(props){
    super(props);
  this.state = {
      isOnDefaultToggleSwitch: false,

    }}
    onBackButtonPressAndroid = () => {
       StatusBar.setBackgroundColor('black', true);
       return false;
     };
     onPress2 = () => {
      this.setState({ isOnDefaultToggleSwitch: !this.state.isOnDefaultToggleSwitch });
    }
    handleClick= ()=> {
      var link='market://details?id=com.newSense';
    Linking.canOpenURL(link).then(supported => {
        supported && Linking.openURL(link);
    }, (err) => console.log(err));
  }
    _onDone = () => {

      let shareOptions = {
        title: "Share This App",
        message: "Check Out This Awsome News App \n"+"https://play.google.com/store/apps/details?id=com.newSense",
        
        subject: "Share This App"
      };
      console.log(shareOptions);
      Share.open(shareOptions).catch((err) => { err && console.log(err); });
     }
     _mail=()=>{ Linking.openURL('mailto: newsense.19@gmail.com?subject=Feedback') }



 render() {
   StatusBar.setBackgroundColor('black', true);
   return(
       <AndroidBackHandler onBackPress={this.onBackButtonPressAndroid}>
     <View style={{  height: '100%',
     display: 'flex',flexDirection: 'column', backgroundColor:"#F3F3F3"}}>

        <Icon2  name="cross" size={normalize(30)} color="black" style={{  position: 'absolute',alignSelf:'flex-end',right:wp('4%'),top:hp('1%')}}
        onPress={() => {   StatusBar.setBackgroundColor('black', true);this.props.navigation.goBack();}}
         />


         <View style={styles.upper}>
           <Icon3.Button borderRadius={30} raised name="bookmark" backgroundColor="white" color='#2A2E43' size={normalize(32)}
           paddingHorizontal={normalize(12 )} paddingVertical={normalize(5)} onPress={()=>this.props.navigation.navigate('Bookmarks')}>
               <Text style={{ left:wp('0%'),padding:normalize(8),fontFamily: 'Arial', fontSize: normalize(25)  ,color:'black',justifyContent:'center'}}>
               Bookmarks
             </Text>
           </Icon3.Button>
         </View>


          <View style={styles.upper}>
            <Icon3.Button borderRadius={30} raised name="feedback" backgroundColor="white" color='#2A2E43' size={normalize(32)}
            paddingHorizontal={normalize(14 )} paddingVertical={normalize(5)} onPress={this._mail}>
                <Text style={{ left:wp('0%'),padding:normalize(8),fontFamily: 'Arial', fontSize: normalize(25)  ,color:'black',justifyContent:'center'}}>
                Feedback
              </Text>
            </Icon3.Button>
          </View>
          <View style={styles.upper}>
            <Icon4.Button borderRadius={30} raised name="circle-thin" backgroundColor="white" color='#2A2E43' size={normalize(30)}
            paddingHorizontal={normalize(14 )} paddingVertical={normalize(5)} onPress={this.handleClick}>
                <Text style={{ left:wp('0%'),padding:normalize(8),fontFamily: 'Arial', fontSize: normalize(25)  ,color:'black',justifyContent:'center'}}>
                Rate Us
              </Text>
            </Icon4.Button>
          </View>
          <View style={styles.upper}>
            <Icon3.Button borderRadius={30} raised name="people" style={{borderRadius:normalize(20) }}backgroundColor="white" color='#2A2E43' size={normalize(32)}
            paddingHorizontal={normalize(14 )} paddingVertical={normalize(5)} onPress={this._onDone}>
                <Text style={{ left:wp('0%'),padding:normalize(8),fontFamily: 'Arial', fontSize: normalize(25)  ,color:'black',justifyContent:'center'}}>
                Invite Friend
              </Text>
            </Icon3.Button>
          </View>
            <View style={styles.Bottom}>
            <Text style={{textAlign:'center', fontSize: normalize(12)}} onPress={ ()=> Linking.openURL('http://213.190.4.69:3010/terms-and-conditions') } >Terms&Conditions</Text>
             <Text style={{top:7,textAlign:'center', fontSize: normalize(12)}} onPress={ ()=> Linking.openURL('http://213.190.4.69:3010/privacy-policy') } >Privacy Policy</Text>

            </View>
      </View>
      </AndroidBackHandler>
 );
 }
}
const styles = StyleSheet.create({
  upper:{

    borderRadius:normalize(30),
    backgroundColor: 'white',
    height: normalize(51),
    top:normalize(hp('15%')),
    marginLeft:normalize(40),
    marginBottom:normalize(20),

    width:width*0.75,
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },

  Bottom:{
    borderRadius:normalize(30),
    backgroundColor: '#F3F3F3',
    height: normalize(51),
    top:normalize(hp('15%')),

  }
});
