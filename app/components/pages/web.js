import React,{Component} from "react";
import { View, Text,ActivityIndicator,Dimensions,Image,StatusBar,WebView } from "react-native";

export default class WebScreen extends Component {
  constructor(props){
    super(props);
    this.state ={ isLoading: "true"};

  }


render() {
  const { navigation } = this.props;
  const url = navigation.getParam('url', 'NO-ID');

    return(

      <WebView
        source={{uri: url}}
        style={{marginTop: 20}}
      />

  )

}}
