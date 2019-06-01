import { createStackNavigator, createAppContainer } from "react-navigation";
import {AsyncStorage} from 'react-native';
import HomeScreen from './pages/home';
import DetailsScreen from './pages/detail';
import IntroScreen from './pages/intro';
import ExternalScreen from './pages/external';
import SettingsScreen from './pages/setting';
import BookmarksScreen from './pages/bookmarks';
import SingleBookmarkScreen from './pages/singleBookmark';
import { fromLeft,fromBottom ,fadeIn} from 'react-navigation-transitions';
const handleCustomTransition = ({ scenes }) => {
  const prevScene = scenes[scenes.length - 2];
  const nextScene = scenes[scenes.length - 1];

  // Custom transitions go there
  if (prevScene
    && prevScene.route.routeName === 'Home'
    && nextScene.route.routeName === 'Settings') {
    return fromBottom();
  }
  return fadeIn();
}
const AppNavigator = createStackNavigator(
  {
  Home: {screen:HomeScreen,key:"Home"},
  Details: {screen:DetailsScreen,header: {style: {
          backgroundColor: '#00cafe'
        }}},
  Intro:IntroScreen,
  Article: { screen: ExternalScreen, path: 'news/:id', },
  Settings:SettingsScreen,
  Bookmarks:BookmarksScreen,
  SingleBookmark:SingleBookmarkScreen

},
{
  initialRouteName: "Home",
  headerMode: 'none',
    transitionConfig: (screen) => handleCustomTransition(screen),
}

);
const AppContainer = createAppContainer(AppNavigator);
const AppNavigatorIntro = createStackNavigator(
  {
  Home: {screen:HomeScreen,key:"Home"},
  Details: {screen:DetailsScreen,style: {
          backgroundColor: '#00cafe'
        }},
  Intro:IntroScreen,
  Article: { screen: ExternalScreen, path: 'news/:id', },
  Settings:SettingsScreen,
    Bookmarks:BookmarksScreen,
    SingleBookmark:SingleBookmarkScreen

},
{
  initialRouteName: "Intro",
  headerMode: 'none',
  transitionConfig: (screen) => handleCustomTransition(screen),
}

);

const AppContainerIntro = createAppContainer(AppNavigatorIntro);
export {AppContainer,AppContainerIntro};
