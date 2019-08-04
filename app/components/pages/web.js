import React,{Component} from "react";
import { View, Text,ActivityIndicator,Dimensions,Image,StatusBar,TouchableOpacity,Button  } from "react-native";
import { AndroidBackHandler } from 'react-navigation-backhandler';
import { StackActions,NavigationActions } from "react-navigation";
import { WebView } from 'react-native-webview';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import normalize from '../utils/normalize'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
export default class WebScreen extends Component {
  constructor(props){
    super(props);
    this.state ={ isLoading: "true"};

  }
  
  renderLoadingView() {
      return (
          <ActivityIndicator

             color = '#bc2b78'
             size = "large"

          />
      );
    }
render() {
  var { navigation } = this.props;
  var url = navigation.getParam('url', 'NO-ID');
  console.log(url);
    return(
      <View style={{flex: 1}}  >

      <Icon2.Button raised name="arrow-back" backgroundColor="white" color='#2A2E43' size={normalize(32)}
      paddingHorizontal={normalize(12 )} paddingVertical={normalize(5)}   onPress={() => { this.props.navigation.goBack()}}
      >
          <Text style={{ left:wp('0%'),padding:normalize(8),fontFamily: 'Arial', fontSize: normalize(20)  ,color:'black',justifyContent:'center'}}>
        All News
        </Text>
      </Icon2.Button>



      <WebView
        source={{uri: url}}
        style={{marginTop: normalize(2),flex: 1,height:300}}
        startInLoadingState={true}
        renderLoading={this.renderLoadingView}
      />
      </View>
  )

}}
