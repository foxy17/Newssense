import React, { Component } from 'react';
import { View, ToastAndroid,Text, TouchableOpacity, StyleSheet  } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Share, {ShareSheet, Button} from 'react-native-share';
import Datastore from 'react-native-local-mongodb';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
db = new Datastore({ filename: 'asyncStorageKey', autoload: true });
export default class ShareItem extends Component {
  handleOnPress = () => {
    this.props.onPress();
  };
  constructor(props){

        super(props);

        this.state = {
           visible: false,
           favourite:false
       };
    }
//Share logic and Favourite logic

componentWillMount() {
    let { id,name} = this.props;

  db.find({ _id: id}, (err, docs) =>{
    console.log(docs.length);

    if(docs.length>0)
    {
      this.setState({favourite:true});
        console.log("HEYY");
    }
    else{
      this.setState({favourite:false});
        console.log("222");
    }
      });
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
       title: "Share This Story",
       message: "Read This Awsome Article:",
       url: "https://news119.herokuapp.com/"+this.state.id,
       subject: "Share Link"
     };
     Share.open(shareOptions).catch((err) => { err && console.log(err); });
    }
  _onShare= () =>{
    let shareOptions = {
      title: "Share This Story",
      message: "Read This Awsome Article:\n  "+this.state.name,
      url: "\n https://news119.herokuapp.com/"+this.state.id,
      subject: "Share Link",
      social: Share.Social.WHATSAPP
    };
     Share.shareSingle(shareOptions);
  }
    _Favourite=()=>
    { let { id,name} = this.props;


      db.insert({_id:id,name:name}, function (err, newDoc) {
          console.log(newDoc);

          ToastAndroid.show("Added to Bookmarks", ToastAndroid.SHORT);
      });
      this.setState({favourite:true});

    }
    _unFavourite=()=>
    { let { id,name} = this.props;

      db.remove({ _id:id }, {}, function (err, numRemoved) {

        ToastAndroid.show('Removed From Bookmarks', ToastAndroid.SHORT);
          });
        this.setState({favourite:false});

    }
  render() {
      let { id,name} = this.props;
      console.log("name",this.props.name)
      this.state.id=id;

      this.state.name=name;
    if(this.state.favourite)
    {
      return (
        <View >
            <View  style={styles.shareButton}><Icon2
             raised
             name='share-outline'
             type='material'
             color='#707070'
             size= {wp('7%')}
             onPress={this._onDone}


           />
            </View>


         <View style={styles.shareWhatsapp}><Icon2
          raised
          name='whatsapp'
          type='material'
          color='#707070'
          size= {wp('7%')}
          onPress={this._onShare}

        /></View>
          <View style={styles.bookmark}><Icon
           raised
           name='bookmark'
           type='material'
           color='#707070'
           size= {wp('7%')}
           onPress={this._unFavourite}
         /></View>


       </View>);
    }
    else{
      return (
        <View>

            <View  style={styles.shareButton}><Icon2
             raised
             name='share-outline'
             type='material'
             color='#707070'
             size= {wp('7%')}
             onPress={this._onDone}


           />
            </View>


         <View style={styles.shareWhatsapp}><Icon2
          raised
          name='whatsapp'
          type='material'
          color='#707070'
          size= {wp('7%')}
          onPress={this._onShare}

        /></View>
          <View style={styles.bookmark}><Icon
           raised
           name='bookmark-border'
           type='material'
           color='#707070'
           size= {wp('7%')}
           onPress={this._Favourite}
         /></View>


       </View>


    );
  }
  }
}

const styles = StyleSheet.create({
  shareButton:{
    position:'absolute',
    zIndex:1,
  top: hp('0.5%'),
  right:  wp('0%'),
  },
  shareWhatsapp:{
    zIndex:1,
    position: 'absolute',
  top: hp('0.5%'),
  right: wp('20%'),
  },
  bookmark:{
    zIndex:1,
  position: 'absolute',
  top:  hp('0.5%'),
  right: wp('10%'),
  }
});
