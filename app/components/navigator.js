import { createStackNavigator, createAppContainer } from "react-navigation";
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
  initialRouteName: "Intro"
}

);
const AppContainer = createAppContainer(AppNavigator);
export default AppContainer;
