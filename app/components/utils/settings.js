import React, { Component } from 'react';
import { View, ToastAndroid,Text, TouchableOpacity, StyleSheet  } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { createStackNavigator, createAppContainer } from "react-navigation";

export default class SettingButton extends Component {
  constructor(props) {
     super(props);
   }
   // settings=()=>
   // {
   //     ToastAndroid.show("Settings", ToastAndroid.SHORT);
   //     this.
   // }
   render() {
      return(
        <View style={styles.button}><Icon
         raised
         name='settings'
         type='material'
         color='#001f2e'
         size= {20}
         onPress={()=>this.props.navigate('Settings')}
       /></View>
      );

   }

}
const styles = StyleSheet.create({
  button:{
    zIndex:1,
  position: 'absolute',
  top: 4,
  left: 3
  }
});
