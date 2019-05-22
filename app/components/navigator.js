import { createStackNavigator, createAppContainer } from "react-navigation";
import {AsyncStorage} from 'react-native';
import HomeScreen from './pages/home';
import DetailsScreen from './pages/detail';
import IntroScreen from './pages/intro';
import ExternalScreen from './pages/external';
const AppNavigator = createStackNavigator(
  {
  Home: HomeScreen,
  Details: DetailsScreen,
  Intro:IntroScreen,
  Article: { screen: ExternalScreen, path: 'news/:id', },

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
  Article: { screen: ExternalScreen, path: 'news/:id', },

},
{
  initialRouteName: "Intro",
  headerMode: 'none'
}

);

const AppContainerIntro = createAppContainer(AppNavigatorIntro);
export {AppContainer,AppContainerIntro};
