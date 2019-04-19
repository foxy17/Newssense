// import React from 'react';
// import { FlatList, ActivityIndicator, Text, View  } from 'react-native';

// export default class FetchExample extends React.Component {
//
//   constructor(props){
//     super(props);
//     this.state ={ isLoading: true}
//   }

  // componentDidMount(){
  //   return fetch('http://10.12.4.199:3000/getData')
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //
  //       this.setState({
  //         isLoading: false,
  //         dataSource: responseJson.data,
  //       }, function(){
  //
  //       });
  //
  //     })
  //     .catch((error) =>{
  //       console.error(error);
  //     });
  // }



//   render(){
//
//     if(this.state.isLoading){
//       return(
//         <View style={{flex: 1, padding: 20}}>
//           <ActivityIndicator/>
//         </View>
//       )
//     }
//
//     return(
//
//       <View style={{flex: 1, paddingTop:20}}>

      // <FlatList
      //   data={this.state.dataSource}
      //   renderItem={({item}) => <Text>{item.title}{item.body}</Text>}
      //   keyExtractor={({id}, index) => id}
      // />
//
//
//       </View>
//     );
//   }
// }
import React,{Component} from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  FlatList
} from 'react-native';
import Swiper from 'react-native-swiper-animated';


export default class MainApp extends Component{
    constructor(props){
      super(props);
      this.state ={ isLoading: true,loaded:false
        }
    }

    componentDidMount(){
      return fetch('http://10.12.4.199:3000/getData')
        .then((response) => response.json())
        .then((responseJson) => {

          this.setState({
            isLoading: false,
            loaded:true,
            dataSource: responseJson.data,
          }, function(){

          });

        })
        .catch((error) =>{
          console.error(error);
        });
    }
viewfunc(){



return(
  this.state.dataSource.map((item)=>

    < View key={Math.random()} style={styles.slide3}>

      <Text style={styles.text}>{item.title}</Text>
    </View>

  )
)
}
render(){

    if(this.state.isLoading){
          return(
            <View style={styles.container}>
              <ActivityIndicator size="large"/>
            </View>
          )}

    return(


    <Swiper
     style={styles.wrapper}

     paginationLeft={''}
     paginationRight={''}
     smoothTransition
     stack
     dragDownToBack
     dragY>
     {this.viewfunc()}
   </Swiper>

 )




}
}
const styles = {
  wrapper: {
    backgroundColor: '#009688',
    flex: 1,
    height:5,

  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e91e63',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#673ab7',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3f51b5',
    borderRadius: 20 ,
    marginRight:5,
    marginLeft:5,
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
};
