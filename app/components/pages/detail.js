import React,{Component} from "react";
import { View, Text } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";


export default class DetailsScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Details Screen</Text>
      </View>
    );
  }
}