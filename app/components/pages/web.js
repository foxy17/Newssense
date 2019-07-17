import React,{Component} from "react";
import { View, Text,ActivityIndicator,Dimensions,Image,StatusBar  } from "react-native";
import { AndroidBackHandler } from 'react-navigation-backhandler';
import { StackActions,NavigationActions } from "react-navigation";
import { WebView } from 'react-native-webview';
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
      );}
render() {
  var { navigation } = this.props;
  var url = navigation.getParam('url', 'NO-ID');
  console.log(url);
    return(

      <WebView
        source={{uri: url}}
        style={{marginTop: 20}}
        startInLoadingState={true}
        renderLoading={this.renderLoadingView}
      />

  )

}}
