import React, { Component } from 'react';
import { View, ToastAndroid,Text, TouchableOpacity, ScrollView,StyleSheet ,
  Dimensions,ActivityIndicator, Image, FlatList,TouchableHighlight,StatusBar } from 'react-native';
import Datastore from 'react-native-local-mongodb';
db = new Datastore({ filename: 'asyncStorageKey', autoload: true });
import Swipeout from 'react-native-swipeout';
import { AndroidBackHandler } from 'react-navigation-backhandler';
import normalize from '../utils/normalize'
import {
    CachedImage,
    ImageCacheProvider,
    ImageCacheManager
} from 'react-native-cached-images'

export default class BookmarksScreen extends Component {
  constructor(props) {
     super(props);
     this.state={
       data:[],
       loading:true
     }
   }

   componentDidMount() {
     db.find({}, (err, docs) =>{
       console.log(docs);
       this.state.data=docs;
       this.setState({loading:false});
     });
    }

    onBackButtonPressAndroid = () => {
       StatusBar.setBackgroundColor('#848484', true);
       return false;
     };

 deleteNote(data) {
    let {id,name}=data;
    console.log((data._id));
     db.remove({ _id: data._id}, (err, docs) =>{console.log(data._id);})
     db.find({}, (err, docs) =>{
       console.log(docs);
      this.setState({data:docs});
     });

 }

   render1() {


        if(this.state.loading)
        { console.log("HEYY"+JSON.stringify(this.state.data));
          return(
            <View>
           <ActivityIndicator size="small" color="#848484" />
           </View>)
        }
        else{
           console.log("222"+this.state.data);
           if(this.state.data==undefined){
             return(
               <View style={{flex:1}}><Text>No Bookmarks</Text></View>
             )
           }
            return this.state.data.map((data) => {
              let swipeBtns = [{
                text: 'Delete',
                backgroundColor: 'red',
                underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
                onPress: () => { this.deleteNote(data) }
              }
            ];
            return (
                 <AndroidBackHandler onBackPress={this.onBackButtonPressAndroid} key={data._id}>
              <View   >
              <Swipeout right={swipeBtns}
                autoClose= {true}
                backgroundColor= 'transparent'>
                <TouchableOpacity style={{flexDirection:'row',marginBottom:normalize(5)}} onPress={()=>{console.log(data._id);this.props.navigation.navigate('SingleBookmark', {id: data._id})}}>
                <CachedImage   style={{width: normalize(60), height: normalize(60),padding:normalize(1)}} source={{uri:data.img}}/>

                <Text  style={{  textAlign:'center',flex: 1,color:'black',fontSize: normalize(16)}}> {data.name}</Text>
              </TouchableOpacity>
            </Swipeout>
            </View>
            </AndroidBackHandler>
            )
          })

        }


   }
   render(){
      StatusBar.setBackgroundColor('black', true);
      return(
        <ScrollView contentContainerStyle={{paddingVertical: 20}}>{this.render1()}</ScrollView>
      )
   }

}
