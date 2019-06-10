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

              <Icon
               name='refresh'
               type='material'
               color='#1D7FFF'

               onPress={this.props.parentMethod}
               size= {wp('7%')}

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
  marginTop:hp('1%'),
  flexDirection:'row',
  top:hp('0.1%')

},
header:{
  left:wp('32%'),
  fontWeight: 'bold',
  fontSize: wp('5%'),
  color:'#1D7FFF',
    flexDirection:'row',
    top:hp('0.7%')

},
toggle:{
  flex:1,
  left:wp('62%'),
  fontWeight: 'bold',
  fontSize: wp('5%'),
  color:'#1D7FFF',
}
});
