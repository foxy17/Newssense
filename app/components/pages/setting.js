import React,{Component} from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  FlatList,Image,Platform,StyleSheet,Button, Dimensions,StatusBar
} from 'react-native';
import { AndroidBackHandler } from 'react-navigation-backhandler';
var width = Dimensions.get('window').width;
import Icon from 'react-native-vector-icons/Foundation';
import Icon2 from 'react-native-vector-icons/Entypo';
import Icon3 from 'react-native-vector-icons/MaterialIcons';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import SwitchToggle from 'react-native-switch-toggle';


export default class SettingsScreen extends Component {
  constructor(props){
    super(props);
  this.state = {
      isOnDefaultToggleSwitch: true,

    }}
    onBackButtonPressAndroid = () => {
       StatusBar.setBackgroundColor('#0099cb', true);
       return false;
     };
     onPress2 = () => {
      this.setState({ isOnDefaultToggleSwitch: !this.state.isOnDefaultToggleSwitch });
    }


 render() {
   StatusBar.setBackgroundColor('white', true);
   return(
       <AndroidBackHandler onBackPress={this.onBackButtonPressAndroid}>
     <View style={{  height: '100%',
     display: 'flex',flexDirection: 'column', backgroundColor:"#F3F3F3"}}>

        <Icon2  name="cross" size={30} color="black" style={{  position: 'absolute',alignSelf:'flex-end',right:wp('4%'),top:hp('1%')}}
        onPress={() => {   StatusBar.setBackgroundColor('#0099cb', true);this.props.navigation.goBack();}}
         />

        <View>

        </View>

         <View style={styles.upper}>
           <Icon.Button raised name="book-bookmark" backgroundColor="white" color='#2A2E43' size={wp('10%')}
           paddingHorizontal={wp('5%')} paddingVertical={hp('1%')} onPress={()=>this.props.navigation.navigate('Bookmarks')}>
               <Text style={{ left:wp('0%'),padding:5,fontFamily: 'Arial', fontSize: wp('7%')  ,color:'black',justifyContent:'center'}}>
               Bookmarks
             </Text>
           </Icon.Button>
         </View>

          <View  style={styles.Middle} >

            <View  style={{flexDirection: 'row',marginLeft:5, justifyContent:'space-around' }}>
                  <View  style={{flexDirection: 'row',marginTop:hp('2.5%')}}>
                  <Icon3 name="notifications" size={wp('10%')} color="#2A2E43"  />

                    <Text style={{ left:wp('3%'),fontFamily: 'Arial', fontSize: wp('7%') ,color:'black',justifyContent:'center'}}>
                      Notification
                    </Text>
                  </View>

                  <SwitchToggle
                   containerStyle={{
                     marginTop: hp('3%'),

                  width: wp('12%'),
                  height: hp('3%'),
                  borderRadius: wp('10%'),
                  backgroundColor: '#1D7FFF',
                  padding: 0,

                   }}
                   circleStyle={{

                     width: wp('6%'),
                       height: wp('6%'),
                       borderRadius: 19,
                       backgroundColor: 'white',  // rgb(102,134,205)
                   }}
                   switchOn={this.state.isOnDefaultToggleSwitch}
                   onPress={this.onPress2}
                   circleColorOff='#2A2E43'
                   circleColorOn='#2A2E43'
                   backgroundColorOn='#1D7FFF'
                   backgroundColorOff='#F4F4F4'
                   duration={500}
                 />
            </View>
          </View>
      </View>
      </AndroidBackHandler>
 );
 }
}
const styles = StyleSheet.create({
  upper:{

    borderRadius:wp('2%'),
    backgroundColor: 'white',
    height: hp('9%'),
    top:hp('30%'),
    marginLeft:wp('13%'),

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
  Middle:{

    borderRadius:wp('2%'),
    top:hp('30%'),
    backgroundColor: 'white',
      marginLeft:wp('13%'),
      marginTop:hp('15%'),
      width:width*0.75,
        height: hp('10%'),
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
    zIndex:1,
  position: 'absolute',
  top: 9,
  right: 0
  }
});
