import React, { Component } from 'react';
import { View, ToastAndroid,Text, TouchableOpacity, StyleSheet  } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import IconShare from 'react-native-vector-icons/Entypo';
import Share, {ShareSheet, Button} from 'react-native-share';
import Datastore from 'react-native-local-mongodb';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import normalize from './normalize'
import firebase from 'react-native-firebase';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../../config.json';
const IconCustom = createIconSetFromFontello(fontelloConfig);
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


    if(docs.length>0)
    {
      this.setState({favourite:true});

    }
    else{
      this.setState({favourite:false});

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
     var id='https://news.newssense.co/'+this.state.id;
      ToastAndroid.show("Wait A Moment", ToastAndroid.SHORT);
     var dm = new firebase.links.DynamicLink(
              id,
            'https://news.newssense.co'
          ).social.setImageUrl(this.state.pic).social.setTitle(this.state.name).android.setPackageName('com.newSense');
          console.log(dm);

          firebase.links()
    .createShortDynamicLink(dm, 'SHORT')
    .then((url) => {
      let shareOptions = {
        title: "Share This Story",
        message: "Checkout this news:"+"\n"+this.state.name+"\n",
        url: url,
        subject: "Share Link"
      };
       Share.open(shareOptions).catch((err) => { err && console.log(err); });


    });



    }
  _onShare= () =>{
    var id='https://news.newssense.co/'+this.state.id;
     ToastAndroid.show("Opening Whatsapp", ToastAndroid.SHORT);
    var dm = new firebase.links.DynamicLink(
             id,
           'https://news.newssense.co'
         ).android.setPackageName('com.newSense');
         console.log(dm);
         firebase.links()
   .createShortDynamicLink(dm, 'SHORT')
   .then((url) => {
     let shareOptions = {
       title: "Share This Story",
       message: "Checkout this news:"+"\n"+this.state.name+"\n",
       url: url,
       subject: "Share Link",
       social: Share.Social.WHATSAPP
     };

    Share.shareSingle(shareOptions);

   });

  }
    _Favourite=()=>
    { let { id,name,img} = this.props;


      db.insert({_id:id,name:name,img:img}, function (err, newDoc) {
          console.log(newDoc);

          ToastAndroid.show("Added to Bookmarks", ToastAndroid.SHORT);
      });
      this.setState({favourite:true});

    }
    _unFavourite=()=>
    { let { id,name,img} = this.props;

      db.remove({ _id:id }, {}, function (err, numRemoved) {

        ToastAndroid.show('Removed From Bookmarks', ToastAndroid.SHORT);
          });
        this.setState({favourite:false});

    }
  render() {
      let { id,name,img} = this.props;
      this.state.pic=img;
      this.state.id=id;

      this.state.name=name;
    if(this.state.favourite)
    {
      return (
        <View >
            <View  style={styles.shareButton}><IconShare
             raised
             name='share'
             type='entypo'
             color='#000000'
             size= {normalize(23)}
             onPress={this._onDone}


           />
            </View>


         <View style={styles.shareWhatsapp}><Icon2
          raised
          name='whatsapp'
          type='material'
          color='#000000'
          size= {normalize(23)}
          onPress={this._onShare}

        /></View>
          <View style={styles.bookmark}><Icon
           raised
           name='bookmark'

           color='#000000'
           size= {normalize(23)}
           onPress={this._unFavourite}
         /></View>


       </View>);
    }
    else{
      return (
        <View>

            <View  style={styles.shareButton}><IconShare
             raised
             name='share'
             type='entypo'
             color='#000000'
             size= {normalize(23)}
             onPress={this._onDone}


           />
            </View>


         <View style={styles.shareWhatsapp}><Icon2
          raised
          name='whatsapp'
          type='material'
          color='#000000'
          size= {normalize(23)}
          onPress={this._onShare}

        /></View>
          <View style={styles.bookmark}><Icon
           raised
           name='bookmark-o'
           type='10523-200'
           color='#000000'
           size= {normalize(23)}
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
  top: hp('0.3%'),
  right: wp('9%'),
  },
  bookmark:{
    zIndex:1,
  position: 'absolute',
  top:  hp('0.5%'),
  right: wp('20%'),
  }
});
