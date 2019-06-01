import React, { Component } from 'react';
import { View, ToastAndroid,Text, TouchableOpacity, StyleSheet  } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { createStackNavigator, createAppContainer } from "react-navigation";


export default class SettingButton extends Component {
  constructor(props) {
     super(props);
   }

   render() {
      return(
        <View style={styles.button}><Icon
         raised
         name='settings'
         type='material'
         color='#001f2e'
         size= {25}
         onPress={()=>this.props.navigate('Settings')}
       /></View>
      );

   }

}
const styles = StyleSheet.create({
  button:{
    zIndex:1,
  position: 'absolute',
  top: 6,
  left: 3
  }
});
