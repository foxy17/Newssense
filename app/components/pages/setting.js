import React,{Component} from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  FlatList,Image,Platform,StyleSheet,Button, Dimensions,StatusBar
} from 'react-native';
import { AndroidBackHandler } from 'react-navigation-backhandler';
var width = Dimensions.get('window').width;
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Entypo';

import ToggleSwitch from 'toggle-switch-react-native';



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



 render() {
   StatusBar.setBackgroundColor('#848484', true);
   return(
       <AndroidBackHandler onBackPress={this.onBackButtonPressAndroid}>
     <View style={{  height: '100%',
  display: 'flex',flexDirection: 'column', backgroundColor:"#e2e2e2"}}>
        <Icon2  name="cross" size={30} color="black" style={{  position: 'absolute',alignSelf:'flex-end',right:10,top:10}}
        onPress={() => {   StatusBar.setBackgroundColor('#0099cb', true);this.props.navigation.goBack();}}
         />
        <View>
          <Text style={{fontSize: 30,fontWeight: 'bold',top:60,left:55,color:'black'}}>
          Settings</Text>
        </View>

         <View style={styles.upper}><Text>Test Label</Text>
         </View>
          <View  style={styles.Middle} >
          <Icon.Button name="star" backgroundColor="white" color='yellow' size={35}
          paddingHorizontal={23} paddingVertical={10} onPress={()=>this.props.navigation.navigate('Bookmarks')}

          >
              <Text style={{ left:23,padding:5,fontFamily: 'Arial', fontSize: 20 ,color:'black',justifyContent:'center'}}>
                Bookmarks
              </Text>
            </Icon.Button>

            <View  style={{flexDirection: 'row',marginLeft:10,  justifyContent:'space-around' }}>
                  <Icon name="notifications" size={30} color="yellow"  />

                  <ToggleSwitch
                    isOn={this.state.isOnDefaultToggleSwitch}
                    onColor='purple'
                    offColor='#d1d1d1'
                    label='Notifications'
                    labelStyle={{color: 'black', fontFamily: 'Arial', fontSize: 20,right:0 }}
                    size='small'
                    onToggle={isOnDefaultToggleSwitch => {this.setState({ isOnDefaultToggleSwitch });}}
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
    flex:1,
    display: 'flex',
    backgroundColor: 'white',
    height: 20,
    top:60,
    marginLeft:60,
    marginRight:60,
    width:width*0.701,
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
    flex: 3,
    display: 'flex',
    top:10,
    backgroundColor: 'white',
      margin:60,
      width:width*0.7,
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
