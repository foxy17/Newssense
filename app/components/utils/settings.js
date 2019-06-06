import React, { Component } from 'react';
import { View, Dimensions,ToastAndroid,Text, TouchableOpacity, StyleSheet  } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { createStackNavigator, createAppContainer } from "react-navigation";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import SwitchToggle from 'react-native-switch-toggle';
const {width, height} = Dimensions.get('window');

export default class SettingButton extends Component {
  constructor(props) {
     super(props);
     this.state = {
         isOnDefaultToggleSwitch: true,
       }
   }
   onPress2 = () => {
    this.setState({ isOnDefaultToggleSwitch: !this.state.isOnDefaultToggleSwitch });
  }
   render() {
      return(
        <View style={styles.button}><Icon2
         raised
         name='menu'
         type='material'
         color='#1D7FFF'
         size= {wp('7%')}
         onPress={()=>this.props.navigate('Settings')}

       />
        <Text style={styles.header}>NEWS   </Text>
        <View style={styles.toggle}>
        <SwitchToggle
         containerStyle={{
           marginTop: 0,

        width: wp('12%'),
        height: hp('4%'),
        borderRadius: 25,
        backgroundColor: '#1D7FFF',
        padding: 5,

         }}
         circleStyle={{
           left:wp('1%'),
           width: wp('6.5%'),
             height: wp('6%'),
             borderRadius: 19,
             backgroundColor: 'white',  // rgb(102,134,205)
         }}
         switchOn={this.state.isOnDefaultToggleSwitch}
         onPress={this.onPress2}
         circleColorOff='white'
         circleColorOn='white'
         backgroundColorOn='#1D7FFF'
         backgroundColorOff='#F4F4F4'
         duration={500}
       /></View>
       </View>
      );

   }

}
const styles = StyleSheet.create({
  button:{
    zIndex:1,
  position: 'absolute',
  marginLeft:wp('2.5%'),
  marginTop:hp('4%'),
  flexDirection:'row',
  top:hp('0.8%')

},
header:{
  left:wp('30%'),
  fontWeight: 'bold',
  fontSize: wp('5%'),
  color:'#1D7FFF',
    flexDirection:'row',
    top:hp('0.5%')

},
toggle:{
  flex:1,
  left:wp('57%'),
  fontWeight: 'bold',
  fontSize: wp('5%'),
  color:'#1D7FFF',
}
});
