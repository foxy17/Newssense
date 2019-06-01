import React,{Component} from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  FlatList,Image,Platform,StyleSheet,Button, Dimensions
} from 'react-native';
var width = Dimensions.get('window').width;
import Icon from 'react-native-vector-icons/MaterialIcons';
import ToggleSwitch from 'toggle-switch-react-native';



export default class SettingsScreen extends Component {
  constructor(props){
    super(props);
  this.state = {
      isOnDefaultToggleSwitch: true,

    }}
 render() {
   return(
     <View style={{  height: '100%',
  display: 'flex',flexDirection: 'column', backgroundColor:"#f1f1f1"}}>
        <View>
          <Text style={{fontSize: 30,fontWeight: 'bold',top:60,left:55,color:'black'}}>
          Settings</Text>
        </View>

         <View style={styles.upper}><Text>Test Label</Text>
         </View>
          <View  style={styles.Middle} >
          <Icon.Button name="star" backgroundColor="white" color='yellow' size={35}>
              <Text style={{ left:40,padding:5,fontFamily: 'Arial', fontSize: 20 ,color:'black',justifyContent:'center'}}>
                Bookmarks
              </Text>
            </Icon.Button>

            <View  style={{flexDirection: 'row',marginLeft:10,    justifyContent: 'space-between',}}>
                  <Icon name="notifications" size={30} color="yellow"  />
                  <ToggleSwitch
                    isOn={this.state.isOnDefaultToggleSwitch}
                    onColor='green'
                    offColor='red'
                    label='Notifications'
                    labelStyle={{color: 'black', fontFamily: 'Arial', fontSize: 20,right:15 }}
                    size='small'
                    onToggle={isOnDefaultToggleSwitch => {this.setState({ isOnDefaultToggleSwitch });}}
                    />
            </View>
          </View>
      </View>
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
    width:width*0.7,
    shadowColor: '#003182',
    shadowOffset: { width: 0, height: 9 },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,
    elevation:10
  },
  Middle:{
    flex: 3,
    display: 'flex',
    top:10,
    backgroundColor: 'white',
      margin:60,
      width:width*0.7,
      shadowColor: '#003182',
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.28,
      shadowRadius: 11.95,
      elevation:10
  },
  Bottom:{
    zIndex:1,
  position: 'absolute',
  top: 9,
  right: 0
  }
});
