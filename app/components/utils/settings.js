import React, { Component } from 'react';
import { View, Dimensions,ToastAndroid,Text, TouchableOpacity, StyleSheet ,Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/FontAwesome';

import { createStackNavigator, createAppContainer } from "react-navigation";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const {width, height} = Dimensions.get('window');
import normalize from '../utils/normalize'

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
  componentDidMount() {
   Icon3.getImageSource('book', 30).then(source =>
     this.setState({ icon1: source })
   );
   Icon3.getImageSource('video-camera', 30).then(source =>
     this.setState({ icon2: source })
   );
 }
   render() {
    if(this.props.button=="Video")
    {
      return(
        <View style={styles.button}><Icon2
          raised
          name='menu'
          type='material'
          color='#1D7FFF'
          size= {normalize(23)}
          onPress={()=>this.props.navigate('Settings')}

        />
        <View style={styles.header}>
        <TouchableOpacity onPress={()=>this.props.navigate('Home')} style={{borderWidth:1,borderColor:'grey',elevation:1,alignItems:'center',backgroundColor:'white',borderTopLeftRadius:15,borderBottomLeftRadius:15,width:normalize(40)}}>
          <Icon3
           name="book"
           elevation={5}
           style={{right:1}}
           size= {normalize(20)}
          onPress={()=>this.props.navigate('Home')}
         />
         </TouchableOpacity>
         <TouchableOpacity onPress={()=>this.props.navigate('VideoList')} style={{borderWidth:1,borderColor:'grey',elevation:1,alignItems:'center',backgroundColor:'white',borderTopRightRadius:15,borderBottomRightRadius:15,width:normalize(40)}}>
         <Icon3
        name="video-camera"
        color={"#1D7FFF"}
        elevation={5}
        size= {normalize(20)}
        onPress={()=>this.props.navigate('VideoList')}
        /></TouchableOpacity>
        </View>
         <View style={styles.toggle}>

               <Icon
                name='refresh'
                type='material'
                color='#1D7FFF'
                elevation={2}
                onPress={this.props.parentMethod}
                size= {normalize(23)}

                /></View>
        </View>
      );
    }
      else if(this.props.button=="Article"){
      return(
        <View style={styles.button}><Icon2
          raised
          name='menu'
          type='material'
          color='#1D7FFF'
          size= {normalize(23)}
          onPress={()=>this.props.navigate('Settings')}

        />
        <View style={styles.header}>
        <TouchableOpacity   onPress={()=>this.props.navigate('Home')} style={{borderWidth:1,borderColor:'grey',elevation:1,alignItems:'center',backgroundColor:'white',borderTopLeftRadius:15,borderBottomLeftRadius:15,width:normalize(40)}}>
          <Icon3
           name="book"
           color={"#1D7FFF"}
           elevation={5}
           style={{right:1}}
           size= {normalize(20)}
          onPress={()=>this.props.navigate('Home')}
         />
         </TouchableOpacity>
         <TouchableOpacity   onPress={()=>this.props.navigate('VideoList')} style={{borderWidth:1,borderColor:'grey',elevation:1,alignItems:'center',backgroundColor:'white',borderTopRightRadius:15,borderBottomRightRadius:15,width:normalize(40)}}>
         <Icon3
        name="video-camera"

        elevation={5}
        size= {normalize(20)}
        onPress={()=>this.props.navigate('VideoList')}
        /></TouchableOpacity>
        </View>
         <View style={styles.toggle}>

               <Icon
                name='refresh'
                type='material'
                color='#1D7FFF'
                elevation={2}
                onPress={this.props.parentMethod}
                size= {normalize(23)}

                /></View>
        </View>
      );
    }

   }

}
const styles = StyleSheet.create({
  button:{
    zIndex:1,
  position: 'absolute',
  marginLeft:wp('2.5%'),
  marginTop:hp('1%'),
  flexDirection:'row',
  top:normalize(7
  )

},
header:{
  left:normalize(95),
 flexDirection:'row',
    top:normalize(0),
    height:normalize(25),


},
toggle:{
  flex:1,
  left:normalize(182),
  fontWeight: 'bold',
  fontSize: wp('5%'),
  color:'#1D7FFF',
  top:normalize(2)
}
});
