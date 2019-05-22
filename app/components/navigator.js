import { createStackNavigator, createAppContainer } from "react-navigation";
import {AsyncStorage} from 'react-native';
import HomeScreen from './pages/home';
import DetailsScreen from './pages/detail';
import IntroScreen from './pages/intro';
const AppNavigator = createStackNavigator(
  {
  Home: HomeScreen,
  Details: DetailsScreen,
  Intro:IntroScreen
},
{
  initialRouteName: "Home",
  headerMode: 'none'
}

);
const AppContainer = createAppContainer(AppNavigator);
const AppNavigatorIntro = createStackNavigator(
  {
  Home: HomeScreen,
  Details: DetailsScreen,
  Intro:IntroScreen,
  Link: {
    screen: LinkScreen,
    path: 'Link/:id',
  }
},
{
  initialRouteName: "Intro",
  headerMode: 'none'
}

);
const prefix = 'link://';
const AppContainerIntro = createAppContainer(AppNavigatorIntro);
export {AppContainer,AppContainerIntro};
