import React,{Component} from "react";
import normalize from '../utils/normalize'
import { View, Text,ActivityIndicator,StatusBar,
FlatList,Image,Dimensions,Animated,ScrollView ,Platform, PixelRatio,TouchableHighlight ,RefreshControl,PanResponder,TouchableOpacity,TouchableWithoutFeedback,ImageBackground  } from "react-native";
export default class Time extends Component {
  constructor(props){
        super(props);
    }
    render(){
      let {date,source} = this.props;
      // console.log(date,"Publish");
      var datePublished=new Date(date);
      // console.log("Date pusblish",datePublished);
      var date1=new Date();
      // console.log(date1.getDate(),"Current")
      const month = datePublished.toLocaleString('en-us', { month: 'long' });
      var final;
      if(date1.getMonth()<=datePublished.getMonth() && date1.getDate()<=datePublished.getDate()){
        final=" / Today"
        return(
            <View style={{flexDirection:'row'}} >
            <Text style={{marginTop:normalize(16),fontSize:normalize(10),color:'#afafaf'}}>source:{source}</Text>
            <Text style={{marginTop:normalize(16),fontSize:normalize(10),color:'#afafaf'}}>{final} </Text>
            </View>
        )
      }
      else{
        final=" / "+datePublished.getDate()+" "+month.slice(4,7)
        return(
            <View style={{flexDirection:'row'}} >
            <Text style={{marginTop:normalize(16),fontSize:normalize(10),color:'#afafaf'}}>source:{source}</Text>
            <Text style={{marginTop:normalize(16),fontSize:normalize(10),color:'#afafaf'}}>{final} </Text>
            </View>
        )
      }




    }
}
