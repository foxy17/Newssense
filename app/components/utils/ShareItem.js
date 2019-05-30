import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet  } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Share, {ShareSheet, Button} from 'react-native-share';

export default class ShareItem extends Component {
  handleOnPress = () => {
    this.props.onPress();
  };
  constructor(props){
        super(props);
        this.state = {
           id: 0,
           visible: false
       };
    }
    onCancel() {
   console.log("CANCEL")
   this.setState({visible:false});
 }
   onOpen() {
     console.log("OPEN")
     this.setState({visible:true});
   }
   _onDone = () => {

     let shareOptions = {
       title: "React Native",
       message: "Read This Awsome Article",
       url: "https://news119.herokuapp.com/"+this.state.id,
       subject: "Share Link"
     };
     Share.open(shareOptions).catch((err) => { err && console.log(err); });
    }
  _onShare= () =>{
    let shareOptions = {
      title: "React Native",
      message: "Read This Awsome Article",
      url: "https://news119.herokuapp.com/"+this.state.id,
      subject: "Share Link",
      social: Share.Social.WHATSAPP
    };
     Share.shareSingle(shareOptions);
  }

  render() {
    let { id } = this.props;
    this.state.id=id;

    return (
      <View>

          <View  style={styles.shareButton}><Icon
           raised
           name='share'
           type='material'
           color='black'
           size= {29}
           onPress={this._onDone}


         />
          </View>


       <View style={styles.shareWhatsapp}><Icon2
        raised
        name='whatsapp'
        type='material'
        color='black'
        size= {29}
        onPress={this._onShare}

      /></View>
        <View style={styles.bookmark}><Icon
         raised
         name='bookmark'
         type='material'
         color='black'
         size= {29}

       /></View>


     </View>
    );
  }
}

const styles = StyleSheet.create({
  shareButton:{
    position:'absolute',
    zIndex:1,
  top: 9,
  right: 90
  },
  shareWhatsapp:{
    zIndex:1,
    position: 'absolute',
  top: 9,
  right: 45
  },
  bookmark:{
    zIndex:1,
  position: 'absolute',
  top: 9,
  right: 0
  }
});
