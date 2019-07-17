import React from 'react';
import { FlatList, ActivityIndicator, Text, View ,Image } from 'react-native';

export default class FetchExample extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    return fetch('https://news119.herokuapp.com/getData')
      .then((response) => response.json())
      .then((responseJson) => {
		console.log(responseJson.data.length);
        this.setState({
          isLoading: false,
          dataSource: responseJson.data,
        }, function(){
		
        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }



  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={{flex: 1, paddingTop:20}}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <View><Text>{item.title}, {item.img.data}</Text><Image
          style={{width: 50, height: 50}}
          source={{uri: 'item.img.data'}}
        /></View>}
          keyExtractor={(item, index) => item._id}
        />
      </View>
    );
  }
}
